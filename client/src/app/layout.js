import localFont from "next/font/local";

import { UserProvider } from "./UserContext.js";
import CheckCookie from "./checkCookie";
import "./styles/globals.scss";

export const metadata = {
  icons: {
    icon: "/icon.png",
  },
  title: "saanguide",
  keywords: ["Blog", "fitness", "information", "saanguide"],
  description:
    "Explore captivating insights and stories across a variety of topics, all curated from a place of passion and expertise.",
  creator: "Jonathan Saan",
  language: "en-US",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "saanguide",
    description:
      "Explore captivating insights and stories across a variety of topics, all curated from a place of passion and expertise.",
    url: "https://www.saanguide.com",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "saanguide website logo with a dark background",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "saanguide",
    description:
      "Explore captivating insights and stories across a variety of topics, all curated from a place of passion and expertise.",
    image: {
      url: "/logo.png",
      alt: "saanguide website logo with a dark background",
    },
  },
};

const myFont = localFont({
  src: "../../public/fonts/RobotoCondensed-Regular.ttf",
});

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
