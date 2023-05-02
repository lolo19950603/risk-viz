import "./globals.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import "primereact/resources/primereact.css"; // core css
import "primeicons/primeicons.css";
import MainNavigation from "../components/NavBar/NavBar";

export const metadata = {
  title: "Work Sample for UI/UX Developers",
  description: "Work Sample for UI/UX Developers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <MainNavigation />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
