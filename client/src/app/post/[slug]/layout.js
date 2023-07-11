export const metadata = {
  title: "slug - Saan's Guidebook",
  description: "description about slug",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
