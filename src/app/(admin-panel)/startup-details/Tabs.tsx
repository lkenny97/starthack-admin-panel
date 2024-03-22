import React from 'react';
import styles from "./page.module.scss";
import Link from "next/link";
import {useSearchParams} from "next/navigation";

interface TabsProps {
}

const Tabs = ({}: TabsProps) => {
  const searchParams = useSearchParams()

  return (
    <section className={styles.tabs}>
      <Link href={`/startup-details?id=${searchParams.get("id")}`}>Dashboard</Link>
      <Link href={`/startup-details/reports?id=${searchParams.get("id")}`}>Reports</Link>
      <Link href={`/startup-details/meetings?id=${searchParams.get("id")}`}>Meetings</Link>
    </section>
  );
};

export default Tabs;