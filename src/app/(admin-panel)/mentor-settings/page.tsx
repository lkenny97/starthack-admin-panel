import Sidebar from "@/app/(admin-panel)/Sidebar";
import Content from "@/app/(admin-panel)/Content";
import {columns, Mentor} from "@/app/(admin-panel)/mentor-settings/columns";
import styles from "./page.module.scss";
import {DataTable} from "@/components/ui/data-table";

async function getData(): Promise<Mentor[]> {
  // Fetch data from your API here.
  return [
    {
      id: 1,
      name: "Kanan Asadov",
      company: "TeklifimGelsin",
    },
  ]
}

export default async function MentorSettingsPage() {
  const data = await getData()

  return (
    <>
      <Sidebar pathname={"/mentor-settings"} />
      <Content>
        <div className={styles.table}>
          <DataTable columns={columns} data={data} />
        </div>
      </Content>
    </>
  );
}
