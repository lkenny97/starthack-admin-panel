import Sidebar from "@/app/(admin-panel)/Sidebar";
import Content from "@/app/(admin-panel)/Content";
import styles from "@/app/(admin-panel)/mentor-settings/page.module.scss";
import {columns, TimeSlot} from "@/app/(admin-panel)/available-slots/columns";
import {Button} from "@/components/ui/button";
import {DataTable} from "@/components/ui/data-table";

async function getData(): Promise<TimeSlot[]> {
  // Fetch data from your API here.
  return [
    {
      id: 1,
      startTime: 1710987719000,
      endTime: 1710987729000,
      available: true,
    },
    {
      id: 2,
      startTime: 1710987759000,
      endTime: 1710987769000,
      available: false,
    }
  ]
}

export default async function AvailableSlotsPage() {
  const data = await getData()
  return (
    <>
      <Sidebar pathname={"/available-slots"} />
      <Content>
        <Button>+ Add new slot</Button>
        <div className={styles.table}>
          <DataTable columns={columns} data={data}/>
        </div>
      </Content>
    </>
  );
}
