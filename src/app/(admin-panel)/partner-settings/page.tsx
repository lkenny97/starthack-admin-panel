"use client";
import Sidebar from "@/app/(admin-panel)/Sidebar";
import Content from "@/app/(admin-panel)/Content";
import styles from "@/app/(admin-panel)/mentor-settings/page.module.scss";
import {columns, Partner} from "@/app/(admin-panel)/partner-settings/columns";
import {DataTable} from "@/components/ui/data-table";


export default function PartnerSettingsPage() {
  const data =  [
    {
      id: 1,
      name: "Hakan Biri",
      company: "Start Up Wise Guys",
    },
  ]
  return (
    <>
      <Sidebar pathname={"/partner-settings"} />
      <Content>
        <div className={styles.table}>
          <DataTable columns={columns} data={data}/>
        </div>
      </Content>
    </>
  );
}
