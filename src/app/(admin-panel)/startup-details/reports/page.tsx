"use client";

import React, {Suspense} from 'react';
import Sidebar from "@/app/(admin-panel)/Sidebar";
import Link from "next/link";
import {DataTable} from "@/components/ui/data-table";
import {columns, Report} from './columns';
import Tabs from "@/app/(admin-panel)/startup-details/Tabs";
import styles from './page.module.scss';
import Content from "@/app/(admin-panel)/Content";
import {useSearchParams} from "next/navigation";
interface PageProps {
  searchParams: any,
}

const Page = ({}: PageProps) => {
  const data = [
    {
      id: 1,
      name: "Kanan Asadov",
      company: "TeklifimGelsin",
    },
  ]


  return (
    <>
      <Sidebar pathname={"/startup-settings"}/>
      <Content>
        <Suspense>
          <Tabs />
        </Suspense>
        <div className={styles.table}>
          <DataTable columns={columns} data={data}/>
        </div>
      </Content>
    </>
  );
};

export default Page;
