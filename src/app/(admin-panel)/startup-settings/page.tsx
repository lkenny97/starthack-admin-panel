"use client";
import React from 'react';
import {Button} from "@/components/ui/button";
import Sidebar from "@/app/(admin-panel)/Sidebar";
import Content from "@/app/(admin-panel)/Content";
import {columns, Startup} from "@/app/(admin-panel)/startup-settings/columns";
import {DataTable} from "@/components/ui/data-table";
import styles from './page.module.scss';
import {getAllStartUps} from "@/api/startupAPI";

export default function StartupSettingsPage() {
  const [startupList, setStartupList] = React.useState([])

  React.useEffect(() => {
    getAllStartUps().then(list => setStartupList(list))
  }, [])

  return (
    <>
      <Sidebar pathname={"/startup-settings"} />
      <Content>
        <div className={styles.table}>
          <DataTable columns={columns} data={startupList}/>
        </div>
      </Content>
    </>
  );
}
