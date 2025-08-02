import { Montserrat } from "next/font/google";
import "./globals.css";

import { Toaster } from "sonner";

const montserrat = Montserrat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "EasyTech Innovate",
  description: "Natural skincare products for healthy, glowing skin",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} antialiased`}
      >
 
        {children}

        <Toaster 
          position="top-right"
          richColors
          expand={true}
          duration={4000}
          closeButton
        />
      </body>
    </html>
  );
}
