import { Roboto } from "next/font/google";

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

const roboto = Roboto({
  weight: ["300", "400"],
  subsets: ["latin"],
})

export default function RootLayout({ children }) {
  return (
    <UserProvider>
      <html lang="en" className={roboto.className}>
        <body suppressHydrationWarning={true}>
          <CheckCookie>{children}</CheckCookie>
        </body>
      </html>
    </UserProvider>
  );
}
