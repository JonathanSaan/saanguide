import { Roboto_Condensed } from "next/font/google";

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

const roboto_condensed = Roboto_Condensed({
  weight: ["300", "400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
})

export default function RootLayout({ children }) {
  return (
    <UserProvider>
      <html lang="en" className={roboto_condensed.className}>
        <body suppressHydrationWarning={true}>
          <CheckCookie>{children}</CheckCookie>
        </body>
      </html>
    </UserProvider>
  );
}
