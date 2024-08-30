export { default } from "next-auth/middleware";

// Modificar añadindo API?
// export const config = {
//     matcher: ['/dashboard/:path*', '/api/:path*',]
// };
export const config = {
    matcher: '/dashboard/:path*'
};