"use client";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import {Button} from "@/components/ui/button";
import Sidebar from "@/app/(admin-panel)/Sidebar";
import Content from "@/app/(admin-panel)/Content";
import styles from "./page.module.scss";
import {IMeeting} from "@/interfaces";
import MeetingCards from "@/app/(admin-panel)/meetings/MeetingCards";
import useUser from "@/hooks/useUser";
import React from "react";
import {getAllMeetingsOfClient, getAllPartners, setMeeting} from "@/api/userAPI";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import DateTimePicker from "react-datetime-picker";
import Select from "react-select";
import {Input} from "@/components/ui/input";

export default function MeetingsPage() {
  const {user} = useUser({redirectTo: "/signin"})
  const [meetingList, setMeetingList] = React.useState([])
  const [modalOpen, setModalOpen] = React.useState(false)
  const [partners, setPartners] = React.useState([])
  const [meetingDateTime, setMeetingDateTime] = React.useState<Date>()
  const [participants, setParticipants] = React.useState([])
  const [purpose, setPurpose] = React.useState("")

  React.useEffect(() => {
    getAllMeetingsOfClient().then(resp => setMeetingList(resp))
    getAllPartners().then(resp => setPartners(resp))
  }, [])

  let meetingsNotResponded = 0

  const meetings = {
    upcoming: [],
    finished: []
  }

  meetingList.map(meeting => {
    // @ts-ignore
    if (new Date().getTime() > new Date(meeting.start_date).getTime())
      meetings.finished.push(meeting)
    else
      meetings.upcoming.push(meeting)
  })


  // MEETINGS.finished.forEach(meeting => {
  //     if (!meeting.ratingFromStartup && !meeting.ratingFromPartner) {
  //         meetingsNotResponded++;
  //     }
  // });

  const handleCreateMeeting = () => {
    if (!meetingDateTime) return

    const day = String(meetingDateTime.getDate()).padStart(2, '0');
    const month = String(meetingDateTime.getMonth() + 1).padStart(2, '0'); // +1 because months are 0-indexed
    const year = meetingDateTime.getFullYear();
    const hours = String(meetingDateTime.getHours()).padStart(2, '0');
    const minutes = String(meetingDateTime.getMinutes()).padStart(2, '0');
    const seconds = String(meetingDateTime.getSeconds()).padStart(2, '0');

    const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

    setMeeting(
      // @ts-ignore
      [user.id, ...participants.map(participant => participant.value)],
      formattedDate,
      purpose
    ).then(resp => {
      setModalOpen(false)
      setMeetingDateTime(undefined)
      setParticipants([])
      setPurpose("")
      getAllMeetingsOfClient().then(resp => setMeetingList(resp))
    })
  }

  return (
    <>
      <Sidebar pathname={"/meetings"} />
      <Content>
        <Button onClick={() => setModalOpen(true)} style={{marginBottom: 16}}>+ Meeting</Button>

        <section className={styles.meetingsSection}>
          <h2>📅 Upcoming Meetings</h2>
          {
            meetings?.upcoming.length > 0
              ? <MeetingCards meetings={meetings.upcoming} />
              : <p>You have no upcoming meetings</p>
          }

        </section>
        <section className={styles.meetingsSection}>
          <div>
            <span>You have not responded to {meetingsNotResponded} meetings</span>
          </div>
          <h2>✅ Finished Meetings</h2>
          {
            meetings?.finished.length > 0
              ? <MeetingCards meetings={meetings.finished} finished />
              : <p>Here you will have your finished meetings</p>
          }
        </section>

        <Dialog open={modalOpen} onOpenChange={open => setModalOpen(open)}>
          {/*<DialogTrigger>Open</DialogTrigger>*/}
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Meeting Questionnaire</DialogTitle>
              <DialogDescription style={{display: "flex", flexDirection: "column", gap: 16}}>
                <div>
                  <p>Choose time for the meeting</p>
                  {/*@ts-ignore*/}
                  <DateTimePicker value={meetingDateTime} onChange={newVal => setMeetingDateTime(newVal)} />
                </div>
                <div>
                  <p>Participants</p>
                  {/*@ts-ignore*/}
                  <Select options={(partners ?? []).map(partner => ({label: partner.name, value: partner.id}))} value={participants} onChange={newVal => setParticipants(newVal)}
                    closeMenuOnSelect={false}
                    isMulti
                    placeholder="Select participants"
                  />
                </div>
                <div>
                  <p>Purpose of the meeting</p>
                  <Input value={purpose} onChange={e => setPurpose(e.target.value)} placeholder="What will it be about?" />
                </div>
                <Button onClick={handleCreateMeeting} style={{float: "right"}}>Submit</Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

      </Content>
    </>
  );
}
