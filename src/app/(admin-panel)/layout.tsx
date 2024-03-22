"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import styles from './page.module.scss'
import Link from "next/link";
import Image from 'next/image'
import Sidebar from "@/app/(admin-panel)/Sidebar";
import useUser from "@/hooks/useUser";
const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Authentication | Start Fellowship",
//   description: "Sign in",
// };

export default function AdminPanelLayout({
                                     children, params
                                   }: Readonly<{
  children: React.ReactNode;
  params: any
}>) {
  const {user} = useUser({redirectTo: "/signin"})

  return (
    <main className={styles.main}>
      <header>
        <nav>
          <Link href="/">
            <Image
              src="https://www.startglobal.org/hubfs/2023/Images/sg-logo.svg"
              alt="Start Fellowship Logo"
              width={110}
              height={50}
              priority
            />
          </Link>
        </nav>
      </header>
      <div className={styles.childWrapper}>
        {children}
      </div>
    </main>
  );
}
