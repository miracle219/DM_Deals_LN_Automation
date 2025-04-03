import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth-config";

// Create handler using auth options
const handler = NextAuth(authOptions);

// Only export the handler functions
export { handler as GET, handler as POST };