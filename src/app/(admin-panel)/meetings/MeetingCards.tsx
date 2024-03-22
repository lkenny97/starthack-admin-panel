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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {addMeetingNote} from "@/api/userAPI";


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
  const [selectedMeetingId, setSelectedMeetingId] = React.useState<number>()
  const [noteText, setNoteText] = React.useState("")

  const handleNoteEdit = () => {
    addMeetingNote(selectedMeetingId ?? 0, noteText).then(resp => {
      setMeetingCardFormOpen(false)
    })
  }

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
                  new Date(meeting.start_date)
                    .toLocaleDateString('en-GB', LONG_DATE_OPTIONS)
                    .replace(/ /g, "\n")
                }
              </span>
              <div className={styles.meetingDetails}>
                {
                  !finished ? <span className={styles.meetingStartIn}>Meeting starting in {Math.floor((new Date(meeting.start_date).getTime() - new Date().getTime()) / (1000 * 60 * 60))} hours</span> :
                  meeting.notes?.length === 0 ? <span onClick={() => {
                    setMeetingCardFormOpen(true)
                    setSelectedMeetingId(meeting.meeting_id)
                  }} className={styles.fillFormBtn}>Please fill the form ✏️</span>
                  : <span>Note: {meeting.notes[0].content}</span>
                }
                <strong>{meeting.attendees.length} Participants</strong>
                <span>
                {new Date(meeting.start_date).toLocaleDateString('en-GB', DAY_TIME_OPTIONS)}
                  &nbsp;-&nbsp;
                  {new Date(meeting.end_date).toLocaleDateString('en-GB', DAY_TIME_OPTIONS)}
              </span>
                <a href={meeting.purpose} target="_blank">{meeting.purpose}</a>
              </div>
            </li>
          ))
        }
      </ul>
      {finished && (
        <Dialog open={meetingCardFormOpen} onOpenChange={open => setMeetingCardFormOpen(open)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Meeting Questionnaire</DialogTitle>
              <DialogDescription>
                <div style={{marginBottom: 16}}>
                  <strong>How was the meeting</strong>
                  <p>You can write about things that would answer to: &quot;Was the mentor adequate for your case?&quot;, &quot;Was their input useful?&quot; etc.</p>
                  <Textarea
                    value={noteText}
                    style={{minWidth: 150}}
                    placeholder="Write your notes here"
                    onChange={e => setNoteText(e.target.value)}

                  />
                </div>
                <Button onClick={handleNoteEdit} style={{float: "right"}}>Submit</Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default MeetingCards;