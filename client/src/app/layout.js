import { Analytics } from "@vercel/analytics";

import { UserProvider } from "./UserContext.js";
import CheckCookie from "./checkCookie";
import "./styles/globals.scss";

export const metadata = {
  icons: {
    icon: "/icon.png",
  },
  title: "Saan's Guidebook",
  keywords: ["Blog", "fitness", "information"],
  description: "A blog about interesting things of which I have a certain domain.",
};

export default function RootLayout({ children }) {
  return (
    <UserProvider>
      <html lang="en">
        <body suppressHydrationWarning={true}>
          <CheckCookie>{children}</CheckCookie>
          <Analytics debug={false} />
        </body>
      </html>
    </UserProvider>
  );
}
