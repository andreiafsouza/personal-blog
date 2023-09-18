import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import ProfilePic from "./components/ProfilePic";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Postfolio Blog",
  description:
    "Embark on a Web Dev Journey: From Front-End to Full Stack. Explore JavaScript, Node.js, React, TypeScript, UI/UX, Scrum, Material UI, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark:bg-slate-800`}>
        <Navbar />
        <ProfilePic />
        {children}
      </body>
    </html>
  );
}
