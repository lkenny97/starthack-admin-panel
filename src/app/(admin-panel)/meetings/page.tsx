import {Button} from "@/components/ui/button";
import Sidebar from "@/app/(admin-panel)/Sidebar";
import Content from "@/app/(admin-panel)/Content";
import styles from "./page.module.scss";
import {IMeeting} from "@/interfaces";
import MeetingCards from "@/app/(admin-panel)/meetings/MeetingCards";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"


const MEETINGS: {upcoming: IMeeting[], finished: IMeeting[]} = {
  upcoming: [
    {
      startTimestamp: 1710976550,
      endTimestamp: 1710976558,
      startup: "TeklifimGelsin",
      partner: "Metin Salt",
      meetingUrl: "https://example.com",
      id: 0,
      ratingFromStartup: undefined,
      punctualityFromStartup: undefined,
      notesFromStartup: undefined,
      ratingFromPartner: undefined,
      punctualityFromPartner: undefined,
      notesFromPartner: undefined,
    },
    {
      startTimestamp: 1710976550,
      endTimestamp: 1710976558,
      startup: "TeklifimGelsin",
      partner: "Metin Salt",
      meetingUrl: "https://example.com",
      id: 0,
      ratingFromStartup: undefined,
      punctualityFromStartup: undefined,
      notesFromStartup: undefined,
      ratingFromPartner: undefined,
      punctualityFromPartner: undefined,
      notesFromPartner: undefined,
    }
  ],
  finished: [
    {
      startTimestamp: 1710976550,
      endTimestamp: 1710976558,
      startup: "TeklifimGelsin",
      partner: "Metin Salt",
      meetingUrl: "https://example.com",
      id: 0,
      ratingFromStartup: undefined,
      punctualityFromStartup: undefined,
      notesFromStartup: undefined,
      ratingFromPartner: undefined,
      punctualityFromPartner: undefined,
      notesFromPartner: undefined,
    },
    {
      startTimestamp: 1710976550,
      endTimestamp: 1710976558,
      startup: "TeklifimGelsin",
      partner: "Metin Salt",
      meetingUrl: "https://example.com",
      id: 0,
      ratingFromStartup: undefined,
      punctualityFromStartup: undefined,
      notesFromStartup: undefined,
      ratingFromPartner: undefined,
      punctualityFromPartner: undefined,
      notesFromPartner: undefined,
    },
    {
      startTimestamp: 1710976550,
      endTimestamp: 1710976558,
      startup: "TeklifimGelsin",
      partner: "Metin Salt",
      meetingUrl: "https://example.com",
      id: 0,
      ratingFromStartup: 5,
      punctualityFromStartup: 4,
      notesFromStartup: "This was a productive meeting for us",
      ratingFromPartner: 1,
      punctualityFromPartner: 3,
      notesFromPartner: "They were late and did not know anything",
    }
  ]
}
export default function MeetingsPage() {

  let meetingsNotResponded = 0

  MEETINGS.finished.forEach(meeting => {
      if (!meeting.ratingFromStartup && !meeting.ratingFromPartner) {
          meetingsNotResponded++;
      }
  });

  return (
    <>
      <Sidebar pathname={"/meetings"} />
      <Content>
        <Button>+ Meeting</Button>

        <section className={styles.meetingsSection}>
          <h2>📅 Upcoming Meetings</h2>
          <MeetingCards meetings={MEETINGS.upcoming} />
        </section>
        <section className={styles.meetingsSection}>
          <div>
            <span>You have not responded to {meetingsNotResponded} meetings</span>
          </div>
          <h2>✅ Finished Meetings</h2>
          <MeetingCards meetings={MEETINGS.finished} finished />
        </section>
      </Content>
    </>
  );
}
