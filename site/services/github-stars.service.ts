import { AbstractService } from "cruzo";

const CRUZO_GITHUB_API = "https://api.github.com/repos/MaratBektemirov/cruzo";
const STARGAZERS_PAGE_SIZE = 100;

class GithubStarsService extends AbstractService {
  count$ = this.newRx<number | null>(null);
  stargazers$ = this.newRx<string[]>([]);
  loading$ = this.newRx(true);

  constructor() {
    super();
    this.load();
  }

  load() {
    this.loading$.update(true);

    fetch(CRUZO_GITHUB_API)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (typeof data?.stargazers_count === "number") {
          this.count$.update(data.stargazers_count);
        }
      })
      .catch(() => {})
      .finally(() => {
        this.loading$.update(false);
      });

    fetch(`${CRUZO_GITHUB_API}/stargazers?per_page=${STARGAZERS_PAGE_SIZE}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!Array.isArray(data)) return;

        const logins = data
          .map((user) => (typeof user?.login === "string" ? user.login : null))
          .filter((login): login is string => Boolean(login));

        this.stargazers$.update(logins);
      })
      .catch(() => {});
  }
}

export const githubStarsService = new GithubStarsService();
