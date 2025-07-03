import "./globals.css";
import {Poppins} from "next/font/google";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins'
})

export const metadata = {
  title: "StoreIt",
  description: "StoreIt - The only storage solution you will need",
  icons: {
    icon: "/favicon.png",
  }
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
