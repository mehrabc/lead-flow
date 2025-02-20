import { Quicksand } from "next/font/google";
import "./globals.css";
import "@/styles/globals.css";
// import Navbar from "./[components]/Navbar";
import "@/styles/globals.css";
import Sidebar from "@/components/Sidebar";
const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // Optional: specify weights you'll use
  variable: "--font-quicksand", // Useful for Tailwind integration
});

export const metadata = {
  title: "LeadFlow",
  description:
    "Lead generation mangement website aimed to manage leads in a large scale.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={quicksand.variable}>
      <body className="quicksand flex ">
        <Sidebar />
        <main className="ml-72 min-w-[300px] w-full">{children}</main>
      </body>
    </html>
  );
}
