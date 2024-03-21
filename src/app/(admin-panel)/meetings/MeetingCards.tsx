"use client";
import React from 'react';
import styles from "@/app/(admin-panel)/meetings/page.module.scss";
import {IMeeting} from "@/interfaces";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import {Button} from "@/components/ui/button";

interface MeetingCardsProps {
  meetings: IMeeting[],
  finished?: boolean
}

const LONG_DATE_OPTIONS: any = {
  day: 'numeric', month: 'long', year: 'numeric'
};

const DAY_TIME_OPTIONS: any = {
  weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false
}

const MeetingCards = ({meetings, finished}: MeetingCardsProps) => {
  const [meetingCardFormOpen, setMeetingCardFormOpen] = React.useState(false)

  return (
    <>
      <ul className={styles.meetingCards}>
        {
          meetings.map(meeting => (
            <li key={meeting.id}>
              <span
                className={styles.meetingDate}
              >
                {
                  new Date(meeting.startTimestamp * 1000)
                    .toLocaleDateString('en-GB', LONG_DATE_OPTIONS)
                    .replace(/ /g, "\n")
                }
              </span>
              <div className={styles.meetingDetails}>
                {
                  !finished ? <span className={styles.meetingStartIn}>Meeting starting in X hours</span> :
                  <span onClick={() => setMeetingCardFormOpen(true)} className={styles.fillFormBtn}>Please fill the form ✏️</span>
                }
                <strong>{meeting.partner}</strong>
                <span>
                {new Date(meeting.startTimestamp * 1000).toLocaleDateString('en-GB', DAY_TIME_OPTIONS)}
                  &nbsp;-&nbsp;
                  {new Date(meeting.endTimestamp * 1000).toLocaleDateString('en-GB', DAY_TIME_OPTIONS)}
              </span>
                <a href={meeting.meetingUrl} target="_blank">{meeting.meetingUrl}</a>
              </div>
            </li>
          ))
        }
      </ul>
      {finished && (
        <Drawer open={meetingCardFormOpen} onClose={() => setMeetingCardFormOpen(false)}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Are you absolutely sure?</DrawerTitle>
              <DrawerDescription>This action cannot be undone.</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose>
                <Button onClick={() => setMeetingCardFormOpen(false)} variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default MeetingCards;