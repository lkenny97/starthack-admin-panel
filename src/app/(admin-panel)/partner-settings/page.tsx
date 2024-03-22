import Sidebar from "@/app/(admin-panel)/Sidebar";
import Content from "@/app/(admin-panel)/Content";
import styles from "@/app/(admin-panel)/mentor-settings/page.module.scss";
import {columns, Partner} from "@/app/(admin-panel)/partner-settings/columns";
import {DataTable} from "@/components/ui/data-table";

async function getData(): Promise<Partner[]> {
  // Fetch data from your API here.
  return [
    {
      id: 1,
      name: "Hakan Biri",
      company: "Start Up Wise Guys",
    },
  ]
}

export default async function PartnerSettingsPage() {
  const data = await getData()
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
