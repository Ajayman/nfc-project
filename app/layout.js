import * as React from 'react';
import ResponsiveAppBar from "./components/appbar"
import LabelBottomNavigation from "./components/bottomnav";
import Footer from "./components/footer"
import UserIcon from "./components/userIcon"
export const metadata = {
  name: "viewport",
  content: "initial-scale=1, width=device-width",
  title: "NFC Ecommerce",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <ResponsiveAppBar >
          <UserIcon />
        </ResponsiveAppBar>
        {children}
        <Footer />
        <LabelBottomNavigation />
      </body>
      <script src="http://localhost:8097"></script>
    </html>
  );
}
