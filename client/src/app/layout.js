import localFont from "next/font/local";

import { UserProvider } from "./UserContext.js";
import CheckCookie from "./checkCookie";
import "./styles/globals.scss";

export const metadata = {
  icons: {
    icon: "/icon.png",
  },
  title: "Saan's Guidebook",
  keywords: ["Blog", "fitness", "information", "Saan's Guidebook", "saanguide"],
  description: "A blog about interesting things of which I have a certain domain.",
};

const myFont = localFont({ src: "../../public/fonts/RobotoCondensed-Regular.ttf" });

export default function RootLayout({ children }) {
  return (
    <UserProvider>
      <html lang="en">
        <body suppressHydrationWarning={true} className={myFont.className}>
          <CheckCookie>{children}</CheckCookie>
        </body>
      </html>
    </UserProvider>
  );
}
