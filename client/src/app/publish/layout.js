import { UserProvider } from "../UserContext.js";
import CheckCookie from "../checkCookie";

export const metadata = {
  title: "Publish - Saan's Guidebook",
  description: "Publication Creation.",
};

export default function RootLayout({ children }) {
  return (
    <UserProvider>
      <html lang="en">
        <body suppressHydrationWarning={true}>
          <CheckCookie>{children}</CheckCookie>
        </body>
      </html>
    </UserProvider>
  );
}

