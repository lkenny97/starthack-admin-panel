"use client";

import React from 'react';
import {IStartup} from "@/interfaces";
import styles from './page.module.scss';
import {useRouter} from "next/navigation";

interface StartupCardProps {
  startup: IStartup
}

const StartupCard = ({startup}: StartupCardProps) => {
  const router = useRouter()

  return (
    <div onClick={() => router.push(`/startup-details?id=${startup.id}`)} className={styles.startupCard}>
      <div style={{display: "flex", alignItems: "center"}}>
        <span className={styles.name}>{startup.name} | </span>
        <span className={styles.hqCountry}>&nbsp;{startup.hq_country}&nbsp;</span>
      </div>
      <span className={styles.description}>{startup.description}</span>
      <div className={styles.tags}>
        <span>{startup.industry}</span>
      </div>
    </div>
  );
};

export default StartupCard;