import "./styles/globals.scss";

export const metadata = {
  title: "Saan's Guidebook",
  description: "a blog about things like's jonathan saan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
