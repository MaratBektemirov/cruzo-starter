# cruzo-starter

Starter project for the `cruzo` framework.

This repository contains a demo/docs site with examples of:
- `AbstractComponent`, `AbstractService`
- `Rx`, `RxFunc`, `RxScope`
- template engine features (`{{ }}`, `::rx`, `repeat`, `attached`, `inner-html`)
- built-in UI components (`input`, `select`, `button-group`, `upload`, `spinner`, `modal`)

## Framework

Main framework repository: [MaratBektemirov/cruzo](https://github.com/MaratBektemirov/cruzo)

## Scripts

- `npm run dev:site` - run local dev server
- `npm run build:site` - build production site into `dist-site`

## GitHub Pages

This starter is configured for deployment via GitHub Actions (`.github/workflows/deploy.yml`).

Before first deploy:
1. Enable Pages in repository settings (`Settings -> Pages`)
2. Set Source to `GitHub Actions`
3. Push to `master`

### Domain and `deploy.yml` environment variables

GitHub **project** sites are served under a **subpath** of `github.io`: `https://<user>.github.io/<repository>/`. A **custom domain** (or a **user/organization** site at `<user>.github.io` with no repo segment) is usually served from the **root** path `/`.

The build step sets three related values in `.github/workflows/deploy.yml`:

| Variable | Role |
| -------- | ---- |
| **`BASE_PATH`** | Vite [`base`](https://vite.dev/config/shared-options.html#base): prefix for built asset URLs. For default project Pages it must be `/<repository>/` so JS/CSS resolve correctly. |
| **`VITE_REPO_NAME`** | Repository name, exposed to the app as `import.meta.env.VITE_REPO_NAME`. |
| **`GITHUB_DOMAIN`** | When **truthy** (e.g. `yes`), `site/urls.ts` prefixes every `RouteUrlBucket` path with that repo name so client-side routes match the same subpath as `BASE_PATH`. When **falsy** (`no` or omitted), route patterns stay rooted at `/` (typical for local dev or a site served at the domain root). |

**Why this matters:** `BASE_PATH` only fixes **static assets**. The router still compares the **browser URL path** to your route templates. If the live URL is `…github.io/my-repo/docs/...` but routes are declared as `/docs/...`, navigation will not match. Turning **`GITHUB_DOMAIN`** on for “github.io + project subpath” keeps **Vite base** and **router paths** aligned.

**Practical choice:**

- **Default GitHub Pages URL** (`https://<user>.github.io/<repo>/`): keep `BASE_PATH` and `VITE_REPO_NAME` as in the workflow, and set **`GITHUB_DOMAIN: yes`**.
- **Custom domain (or root URL without `/repo/`)**: set **`BASE_PATH: /`**, **`GITHUB_DOMAIN: no`**, and drop or adjust `VITE_REPO_NAME` as needed so `site/urls.ts` matches how the site is actually served.

