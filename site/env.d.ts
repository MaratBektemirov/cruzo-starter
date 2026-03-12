declare module "*.module.css" {
  const classes: Record<string, string>;
  export default classes;
}

declare global {
  interface ScopeEventMap {
    /** Payload: ScopeEvent<{ isActive: boolean }> → linkState.data?.isActive */
    routerLinkStateChanged: { isActive: boolean };
  }
}

export {};