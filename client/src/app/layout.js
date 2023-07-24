import CheckLocalStorage from "./checkLocalStorage";
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
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <CheckLocalStorage>{children}</CheckLocalStorage>
      </body>
    </html>
  );
}
