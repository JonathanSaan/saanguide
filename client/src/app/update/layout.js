import { Suspense } from "react";

import { UserProvider } from "../UserContext.js";
import CheckCookie from "../checkCookie";
import "../styles/globals.scss";

export const metadata = {
  title: "Update - Saan's Guidebook",
  description: "Publication Creation.",
};

export default function RootLayout({ children }) {
  return (
    <UserProvider>
      <html lang="en">
        <body suppressHydrationWarning={true}>
          <Suspense fallback={null}>
            <CheckCookie>{children}</CheckCookie>
          </Suspense>
        </body>
      </html>
    </UserProvider>
  );
}

