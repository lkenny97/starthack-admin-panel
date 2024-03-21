"use client";
import React from 'react'
import {Button} from "@/components/ui/button";
import Sidebar from "@/app/(admin-panel)/Sidebar";
import Content from "@/app/(admin-panel)/Content";
import {Calendar} from "@/components/ui/calendar";

const TIME_SLOTS = [
  {
    startTime: 1710987719000,
    endTime: 1710987729000,
  },
  {
    startTime: 1710987759000,
    endTime: 1710987769000,
  }
]

function formatDate(date: Date) {
  // Extracting parts of the date
  const day = date.getDate(); // Day of the month
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const month = months[date.getMonth()]; // Month name
  const hours = date.getHours().toString().padStart(2, '0'); // Hours with leading zero
  const minutes = date.getMinutes().toString().padStart(2, '0'); // Minutes with leading zero

  // Constructing the formatted date string
  return `${day} ${month.substring(0, 3)} ${hours}:${minutes}`;
}

export default function CalendarSlotsPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  let startDate, endDate;

  return (
    <>
      <Sidebar pathname={"/calendar-slots"} />
      <Content>
        <div style={{backgroundColor: "lightgrey"}}>
          <Button>Add available slot</Button>
          <ul >
            {
              TIME_SLOTS.map((timeSlot, index) => {
                startDate = new Date(timeSlot.startTime)
                endDate = new Date(timeSlot.endTime)

                return (
                  <li key={index}>
                    {formatDate(startDate)} - {formatDate(endDate)}
                  </li>
                )
              })
            }
          </ul>
        </div>
      </Content>
    </>
  );
}
