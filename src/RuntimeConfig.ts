export interface RuntimeConfigBase {
  authentication: {
    url: string;
    clientId: string;
    realm: string;
  };
}

export interface RuntimeConfig extends RuntimeConfigBase {
  company: string;
  showTestSection: boolean;
}
