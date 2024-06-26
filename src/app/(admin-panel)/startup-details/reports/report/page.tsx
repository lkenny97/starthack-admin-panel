"use client";

import React, {Suspense} from 'react';
import Sidebar from "@/app/(admin-panel)/Sidebar";
import Tabs from "@/app/(admin-panel)/startup-details/Tabs";
import styles from './page.module.scss'
import KpiCard from "@/app/(admin-panel)/startup-details/KPICard";
import Content from "@/app/(admin-panel)/Content";
import {useSearchParams} from "next/navigation";

interface PageProps {
  searchParams: any,
}

const KPIS = [
  {
    kpiName: "Monthly Visits",
    kpiValue: 100,
    isNorthStar: true
  },
  {
    kpiName: "Daily Visits",
    kpiValue: 3,
    isNorthStar: false
  },
]

const Page = ({}: PageProps) => {
  return (
    <>
      <Sidebar pathname={"/startup-settings"}/>
      <Content>
        <Suspense>
          <Tabs />
        </Suspense>
        <section className={styles.kpiList}>
          {KPIS.map((kpi, index) => (
            <KpiCard key={index} kpiName={kpi.kpiName} kpiStartValue={kpi.kpiValue}/>
          ))}
        </section>
      </Content>
    </>
  );
};

export default Page;