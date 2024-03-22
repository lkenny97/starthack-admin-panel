import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.scss";
import styles from './layout.module.scss';
import {Toaster} from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Authentication | Start Fellowship",
  description: "Sign in",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={styles.main}>
      {children}
      <Toaster />
    </main>
  );
}
