export interface User {
  id: string;
  email: string;
  name: string;
  getToken: (() => Promise<string>) | undefined;
  [key: string]: any;
}

