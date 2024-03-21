"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type TimeSlot = {
  id: number
  startTime: number,
  endTime: number,
  available: boolean
}

function formatDate(date: Date) {
  // Extracting parts of the date
  const day = date.getDate(); // Day of the month
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const month = months[date.getMonth()]; // Month name
  const hours = date.getHours().toString().padStart(2, '0'); // Hours with leading zero
  const minutes = date.getMinutes().toString().padStart(2, '0'); // Minutes with leading zero

  console.log(`${day} ${month.substring(0, 3)} ${hours}:${minutes}`, "ASDASDASDASD")

  // Constructing the formatted date string
  return `${day} ${month.substring(0, 3)} ${hours}:${minutes}`;
}

export const columns: ColumnDef<TimeSlot>[] = [
  {
    accessorKey: "startTime",
    header: "Start Time",
    cell: ({getValue}) => {return formatDate(new Date(getValue() as number))},
  },
  {
    accessorKey: "endTime",
    header: "End Time",
    cell: ({getValue}) => {return formatDate(new Date(getValue() as number))},
  },
  {
    accessorKey: "available",
    header: "Available",
    cell: (({getValue}) => getValue() ? "Yes" : "No")
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const mentor = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(`${mentor.id}`)}
            >
              View slot
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem><span style={{color: "red"}}>Delete slot</span></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
