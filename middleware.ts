import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      return !!token && token.role === "ADMIN";
    },
  },
});

export const config = {
  matcher: [
    "/admin/dashboard/:path*",
    "/admin/projects/:path*",
    "/admin/messages/:path*",
    "/admin/pdf/:path*",
  ],
};
