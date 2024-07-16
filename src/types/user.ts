export interface User {
  id: string;
  avatar: string | undefined;
  email: string;
  name: string;
  getToken: (() => Promise<string>) | undefined;
  [key: string]: any;
}

