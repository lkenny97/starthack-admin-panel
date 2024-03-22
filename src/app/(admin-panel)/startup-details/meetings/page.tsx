"use client";

import React from 'react';
import Sidebar from "@/app/(admin-panel)/Sidebar";
import Content from "@/app/(admin-panel)/Content";
import {Button} from "@/components/ui/button";
import styles from "@/app/(admin-panel)/meetings/page.module.scss";
import MeetingCards from "@/app/(admin-panel)/meetings/MeetingCards";
import {IMeeting} from "@/interfaces";
import Tabs from "@/app/(admin-panel)/startup-details/Tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import {getAllMeetingsOfClient} from "@/api/userAPI";

interface PageProps {
  searchParams: { id: string }
}

const Page = ({searchParams}: PageProps) => {
  const [meetingList, setMeetingList] = React.useState()

  React.useEffect(() => {
    getAllMeetingsOfClient().then(resp => setMeetingList(resp))

  }, [])

  let meetingsNotResponded = 0

  // MEETINGS.finished.forEach(meeting => {
  //   if (!meeting.ratingFromStartup && !meeting.ratingFromPartner) {
  //     meetingsNotResponded++;
  //   }
  // });

  return (
    <>
      <Sidebar pathname={"/meetings"} />
      <Content>
        <Tabs startupId={searchParams.id} />
        <Button>+ Meeting</Button>

        <section className={styles.meetingsSection}>
          <h2>📅 Upcoming Meetings</h2>
          {/*@ts-ignore*/}
          <MeetingCards meetings={meetingList.upcoming} />
        </section>
        <section className={styles.meetingsSection}>
          <div>
            <span>You have not responded to {meetingsNotResponded} meetings</span>
          </div>
          <h2>✅ Finished Meetings</h2>
          {/*@ts-ignore*/}
          <MeetingCards meetings={meetingList.finished} finished />
        </section>
        {/*@ts-ignore*/}
        <Dialog open={false} onOpenChange={open => setMeetingCardFormOpen(open)}>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Meeting Questionnaire</DialogTitle>
              <DialogDescription>
                <div style={{marginBlock: 16}}>
                  <Select>
                    <SelectTrigger className="w-[300px]">
                      <SelectValue placeholder="Rate the meeting"/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Very Bad</SelectItem>
                      <SelectItem value="1">Bad</SelectItem>
                      <SelectItem value="2">Mediocre</SelectItem>
                      <SelectItem value="3">Good</SelectItem>
                      <SelectItem value="4">Very Good</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div style={{marginBlock: 16}}>
                  <Select>
                    <SelectTrigger className="w-[300px]">
                      <SelectValue placeholder="Was the mentor on time?"/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">They were on time</SelectItem>
                      <SelectItem value="1">0-5 minute late</SelectItem>
                      <SelectItem value="2">5-15 minute late</SelectItem>
                      <SelectItem value="3">Meeting started late due to technical reasons</SelectItem>
                      <SelectItem value="4">Mentor did not join the meeting</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div style={{marginBottom: 16}}>
                  <strong>How was the meeting</strong>
                  <p>You can write about things that would answer to: &quot;Was the mentor adequate for your case?&quot;, &quot;Was their input useful?&quot; etc.</p>
                  <Textarea style={{minWidth: 150}} placeholder="Write your notes here"/>
                </div>
                <Button style={{float: "right"}}>Submit</Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </Content>
    </>
  );
};

export default Page;