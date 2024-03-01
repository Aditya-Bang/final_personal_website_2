import { Inter } from "next/font/google";
import "./globals.css";
//import { WebVitals } from "@/components/WebVitals";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AB Personal Website",
  description: "Aditya Bang's Personal Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black`}>
        {/*<WebVitals />*/}
        {children}
      </body>
    </html>
  );
}
