/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly GITHUB_DOMAIN?: string;
  readonly VITE_REPO_NAME?: string;
  readonly VITE_WALLETCONNECT_PROJECT_ID?: string;
}

declare module "*.module.css" {
  const classes: Record<string, string>;
  export default classes;
}

export {};