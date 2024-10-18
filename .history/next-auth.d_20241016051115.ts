import { DefaultUser } from 'next-auth';
declare module 'next-auth' {

    interface AdapterUser extends DefaultUser {
      role: string; // Add role or any other custom fields you want to extend
    }
    interface Session {
        user?: DefaultUser & { id: string; role: string };
    }
    interface User extends DefaultUser {
        role: string;
    }
}


