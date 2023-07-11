import "./styles/globals.scss";

export const metadata = {
  icons: {
    icon: '/brain.png',
  },
  title: "Saan's Guidebook",
  description: "A blog filled with mobile programming tips and fitness activities to boost your personal growth.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
