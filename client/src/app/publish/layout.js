import { UserProvider } from "../UserContext.js";
import CheckCookie from "../checkCookie";
import "../styles/globals.scss";

export const metadata = {
  title: "Publish - Saan's Guidebook",
  description: "Publication Creation.",
};

export default function RootLayout({ children }) {
  return (
    <UserProvider>
      <CheckCookie>{children}</CheckCookie>
    </UserProvider>
  );
}

