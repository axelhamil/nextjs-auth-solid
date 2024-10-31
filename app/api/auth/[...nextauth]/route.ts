import NextAuth from "next-auth/next";
import { authOptions } from "@/common/config/nextAuth.config";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
