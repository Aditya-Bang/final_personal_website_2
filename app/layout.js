import "./globals.css";
import StarBG2 from "@/components/StarBG2";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from '@vercel/speed-insights/next';

// import StarBG from "@/components/StarBG";
// import { WebVitals } from "@/components/WebVitals"; {/*<WebVitals />*/}
// import { Inter } from "next/font/google";
// const inter = Inter({ subsets: ["latin"] });

import { Anonymous_Pro } from 'next/font/google';
const anonymous_pro = Anonymous_Pro({
  subsets: ["latin"],
  weight: '400'
});

export const metadata = {
  title: "AB Personal Website",
  description: "Aditya Bang's Personal Website",
  keywords: ["aditya bang", "aditya", "bang", "personal website", "portfolio", "web dev", "aditya developer", "mern stack", "aditya bang portfolio"]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${anonymous_pro.className} bg-black scrollbar overflow-auto`}>
        <StarBG2/>
        <div className="absolute h-full w-full ">{children}</div>
        <Analytics/>
        <SpeedInsights/>
      </body>
    </html>
  );
}
