import NextAuth from "next-auth";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


// Define the authentication options
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Custom logic for validating credentials (you should replace with your actual logic)
        if (credentials?.username === "test" && credentials?.password === "password") {
          return { id: 1, name: "Test User", role: "Admin" };
        }
        // Return null if the credentials are invalid
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // Set up NEXTAUTH_SECRET in your .env file
};

// The main NextAuth handler
const handler = NextAuth(authOptions);

// API route handlers for GET and POST requests
export async function GET(request: Request) {
  // Handle GET requests (e.g., to get session)
  return handler(request);
}

export async function POST(request: Request) {
  // Handle POST requests (e.g., for login)
  return handler(request);
}
