import { drawCruzoLogoStar } from "site/utils/cruzo-logo-star";

const TWINKLE_RANGE_MS = 3200;

const GITHUB_STAR_ICON_PX = 14;
const STAR_BASE_SIZE = GITHUB_STAR_ICON_PX / 2;

type StarSpec = {
  nx: number;
  ny: number;
  index: number;
  twinklePeriodMs: number;
  twinklePhaseMs: number;
  login?: string;
};

function starHash(index: number, salt = 0) {
  const seed = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453;
  return seed - Math.floor(seed);
}

const FIELD_CX = 0.5;
const FIELD_CY = 0.5;
const FIELD_RX = 0.47;
const FIELD_RY = 0.46;

function fieldVignette(nx: number, ny: number) {
  const dx = (nx - FIELD_CX) / FIELD_RX;
  const dy = (ny - FIELD_CY) / FIELD_RY;
  const dist = Math.hypot(dx, dy);
  if (dist >= 1) return 0;

  const edge = (dist - 0.72) / 0.28;
  if (edge <= 0) return 1;
  if (edge >= 1) return 0;

  const t = edge * edge * (3 - 2 * edge);
  return 1 - t;
}

function sampleStarPosition(index: number) {
  const angle = starHash(index, 2) * Math.PI * 2;
  const radius = Math.sqrt(starHash(index, 3));
  return {
    nx: FIELD_CX + Math.cos(angle) * radius * FIELD_RX,
    ny: FIELD_CY + Math.sin(angle) * radius * FIELD_RY,
  };
}

function twinkleBlend(star: StarSpec, elapsedMs: number) {
  return (
    0.5 -
    0.5 * Math.cos(((elapsedMs + star.twinklePhaseMs) / star.twinklePeriodMs) * Math.PI * 2)
  );
}

function starDrawSize(star: StarSpec, elapsedMs: number, isActive: boolean) {
  const twinkle = twinkleBlend(star, elapsedMs);
  const activeBoost = isActive ? 1.24 : 1;
  return STAR_BASE_SIZE * twinkle * activeBoost;
}

function starAlpha(star: StarSpec, elapsedMs: number) {
  return twinkleBlend(star, elapsedMs);
}

function buildStarField(count: number): StarSpec[] {
  const stars: StarSpec[] = [];
  if (!count) return stars;

  for (let index = 0; index < count; index += 1) {
    const { nx, ny } = sampleStarPosition(index);

    stars.push({
      nx,
      ny,
      index,
      twinklePeriodMs: 2000 + starHash(index, 8) * TWINKLE_RANGE_MS,
      twinklePhaseMs: starHash(index, 7) * TWINKLE_RANGE_MS,
    });
  }

  return stars;
}

const HIT_RADIUS_MIN = GITHUB_STAR_ICON_PX;

function hitRadius(star: StarSpec, elapsedMs: number, isActive: boolean) {
  const size = starDrawSize(star, elapsedMs, isActive);
  return Math.max(HIT_RADIUS_MIN, size * 1.35);
}

export class HeroDotsCanvas {
  private readonly ctx: CanvasRenderingContext2D;
  private readonly eventRoot: HTMLElement;
  private readonly reducedMotion: boolean;
  private resizeObserver?: ResizeObserver;
  private rafId = 0;
  private startTime = 0;
  private width = 0;
  private height = 0;
  private dpr = 1;
  private destroyed = false;
  private stars: StarSpec[] = [];
  private stargazers: string[] = [];
  private activeIndex: number | null = null;
  private elapsedMs = 0;

  constructor(
    private readonly canvas: HTMLCanvasElement,
    starCount = 0,
    eventRoot?: HTMLElement,
  ) {
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) {
      throw new Error("Canvas 2D context is unavailable");
    }

    this.ctx = ctx;
    this.eventRoot = eventRoot ?? canvas.parentElement ?? canvas;
    this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.setStarCount(starCount);
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(canvas);
    this.resize();
    this.bindPointerEvents();

    if (this.reducedMotion) {
      this.draw(0, performance.now());
      return;
    }

    this.startTime = performance.now();
    this.rafId = requestAnimationFrame(this.frame);
  }

  setStarCount(count: number) {
    this.stars = buildStarField(Math.max(0, Math.floor(count)));
    this.assignStargazers();
    this.activeIndex = null;
    this.requestDraw();
  }

  setStargazers(logins: string[]) {
    this.stargazers = logins;
    this.assignStargazers();
    this.requestDraw();
  }

  destroy() {
    this.destroyed = true;
    this.unbindPointerEvents();
    cancelAnimationFrame(this.rafId);
    this.resizeObserver?.disconnect();
    this.resizeObserver = undefined;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private assignStargazers() {
    if (!this.stargazers.length) {
      for (const star of this.stars) {
        star.login = undefined;
      }
      return;
    }

    for (const star of this.stars) {
      star.login = this.stargazers[star.index % this.stargazers.length];
    }
  }

  private bindPointerEvents() {
    this.eventRoot.style.pointerEvents = "auto";
    this.eventRoot.addEventListener("pointermove", this.onPointerMove);
    this.eventRoot.addEventListener("pointerleave", this.onPointerLeave);
    this.eventRoot.addEventListener("pointerdown", this.onPointerDown);
  }

  private unbindPointerEvents() {
    this.eventRoot.removeEventListener("pointermove", this.onPointerMove);
    this.eventRoot.removeEventListener("pointerleave", this.onPointerLeave);
    this.eventRoot.removeEventListener("pointerdown", this.onPointerDown);
  }

  private setActiveIndex(index: number | null) {
    this.activeIndex = index;
    this.eventRoot.style.cursor = index == null ? "default" : "pointer";
    this.requestDraw();
  }

  private onPointerMove = (event: PointerEvent) => {
    if (event.pointerType === "touch") return;

    const point = this.canvasPoint(event.clientX, event.clientY);
    this.setActiveIndex(this.hitTest(point.x, point.y));
  };

  private onPointerLeave = () => {
    this.setActiveIndex(null);
  };

  private onPointerDown = (event: PointerEvent) => {
    const point = this.canvasPoint(event.clientX, event.clientY);
    this.setActiveIndex(this.hitTest(point.x, point.y));
  };

  private canvasPoint(clientX: number, clientY: number) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  }

  private hitTest(x: number, y: number) {
    if (!this.width || !this.height) return null;

    let bestIndex: number | null = null;
    let bestDistance = Infinity;

    for (let i = 0; i < this.stars.length; i += 1) {
      const star = this.stars[i];
      if (!star.login) continue;

      const sx = star.nx * this.width;
      const sy = star.ny * this.height;
      const isActive = i === this.activeIndex;
      const radius = hitRadius(star, this.elapsedMs, isActive);
      const distance = Math.hypot(x - sx, y - sy);

      if (distance <= radius && distance < bestDistance) {
        bestIndex = i;
        bestDistance = distance;
      }
    }

    return bestIndex;
  }

  private drawStarLabel(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    elapsedMs: number,
  ) {
    const index = this.activeIndex;
    const star = index == null ? null : this.stars[index];
    if (!star?.login) return;

    const x = star.nx * width;
    const y = star.ny * height;
    const size = starDrawSize(star, elapsedMs, true);
    const fontSize = Math.max(9, Math.min(12, size * 1.15));

    ctx.save();
    ctx.font = `500 ${fontSize}px "JetBrains Mono", monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.fillText(`@${star.login}`, x, y - size - 2);
    ctx.restore();
  }

  private requestDraw() {
    if (this.destroyed) return;

    if (this.reducedMotion) {
      this.draw(0, performance.now());
      return;
    }

    this.draw(this.elapsedMs, performance.now());
  }

  private resize() {
    if (this.destroyed) return;

    const { width, height } = this.canvas.getBoundingClientRect();
    if (!width || !height) return;

    this.width = width;
    this.height = height;
    this.dpr = window.devicePixelRatio || 1;
    this.canvas.width = Math.max(1, Math.round(width * this.dpr));
    this.canvas.height = Math.max(1, Math.round(height * this.dpr));
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

    if (this.reducedMotion) {
      this.draw(0, performance.now());
    }
  }

  private draw(elapsedMs: number, _now: number) {
    const { ctx, width, height, stars } = this;

    this.elapsedMs = elapsedMs;

    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < stars.length; i += 1) {
      const star = stars[i];
      const x = star.nx * width;
      const y = star.ny * height;
      const vignette = fieldVignette(star.nx, star.ny);
      if (vignette <= 0) continue;

      const isActive = i === this.activeIndex;
      const alpha = starAlpha(star, elapsedMs);
      if (alpha <= 0.004) continue;

      const size = starDrawSize(star, elapsedMs, isActive);

      ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
      drawCruzoLogoStar(ctx, x, y, size);
    }

    this.drawStarLabel(ctx, width, height, elapsedMs);
  }

  private frame = (now: number) => {
    if (this.destroyed) return;

    this.draw(now - this.startTime, now);
    this.rafId = requestAnimationFrame(this.frame);
  };
}
