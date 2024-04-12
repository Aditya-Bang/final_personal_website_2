import { Inter } from "next/font/google";
import "./globals.css";
import StarBG from "@/components/StarBG";
import StarBG2 from "@/components/StarBG2";
//import { WebVitals } from "@/components/WebVitals"; {/*<WebVitals />*/}

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AB Personal Website",
  description: "Aditya Bang's Personal Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black`}>
        <StarBG2/>
        <div className="absolute h-full w-full ">{children}</div>
      </body>
    </html>
  );
}
