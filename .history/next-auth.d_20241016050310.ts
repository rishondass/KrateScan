
declare module "next-auth" {
  interface Session {
    id: string;
    role: number;
  }

  interface User {
    id: string;
    role: number;
  }
}

