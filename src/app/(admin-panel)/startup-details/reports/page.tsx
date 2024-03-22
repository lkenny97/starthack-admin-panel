import React from 'react';
import Sidebar from "@/app/(admin-panel)/Sidebar";
import Link from "next/link";
import {DataTable} from "@/components/ui/data-table";
import {columns, Report} from './columns';
import Tabs from "@/app/(admin-panel)/startup-details/Tabs";
import styles from './page.module.scss';
import Content from "@/app/(admin-panel)/Content";
interface PageProps {
  searchParams: any,
}

async function getData(): Promise<Report[]> {
  // Fetch data from your API here.
  return [
    {
      id: 1,
      name: "Kanan Asadov",
      company: "TeklifimGelsin",
    },
  ]
}
const Page = async ({searchParams}: PageProps) => {
  const data = await getData()


  return (
    <>
      <Sidebar pathname={"/startup-settings"}/>
      <Content>
        <Tabs startupId={searchParams.id} />
        <div className={styles.table}>
          <DataTable columns={columns} data={data}/>
        </div>
      </Content>
    </>
  );
};

export default Page;
