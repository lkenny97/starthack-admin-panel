import {Button} from "@/components/ui/button";
import Sidebar from "@/app/(admin-panel)/Sidebar";
import Content from "@/app/(admin-panel)/Content";
import styles from "@/app/(admin-panel)/mentor-settings/page.module.scss";
import {DataTable} from "@/app/(admin-panel)/mentor-settings/data-table";
import {columns, Startup} from "@/app/(admin-panel)/startup-settings/columns";

async function getData(): Promise<Startup[]> {
  // Fetch data from your API here.
  return [
    {
      id: 1,
      name: "TeklifimGelsin",
      founder: "Hakan Biri",
    },
  ]
}

export default async function StartupSettingsPage() {
  const data = await getData()

  return (
    <>
      <Sidebar pathname={"/startup-settings"} />
      <Content>
        <div className={styles.table}>
          <DataTable columns={columns} data={data}/>
        </div>
      </Content>
    </>
  );
}
