import React from 'react';
import styles from "./page.module.scss";
import Link from "next/link";

interface TabsProps {
  startupId: string
}

const Tabs = ({startupId}: TabsProps) => {
  return (
    <section className={styles.tabs}>
      <Link href={`/startup-details?id=${startupId}`}>Dashboard</Link>
      <Link href={`/startup-details/reports?id=${startupId}`}>Reports</Link>
      <Link href={`/startup-details/meetings?id=${startupId}`}>Meetings</Link>
    </section>
  );
};

export default Tabs;