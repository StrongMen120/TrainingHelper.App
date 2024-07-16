export interface RuntimeConfigBase {
  authentication: {
    domain: string;
    clientId: string;
    audience: string;
    redirectUri?: string;
  };
}

export interface RuntimeConfig extends RuntimeConfigBase {
  userApiBaseUrl: string;
  plansApiBaseUrl: string;
  company: string;
  showTestSection: boolean;
}
