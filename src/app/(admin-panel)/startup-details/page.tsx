"use client";
import React from 'react';
import Sidebar from "@/app/(admin-panel)/Sidebar";
import styles from "./page.module.scss";
import KpiCard from "@/app/(admin-panel)/startup-details/KPICard";
import { Button } from '@/components/ui/button';
import Link from "next/link";
import Tabs from "@/app/(admin-panel)/startup-details/Tabs";
import Content from "@/app/(admin-panel)/Content";
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {compareReports, getKpiData, getStartupInfo} from "@/api/startupAPI";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {Textarea} from "@/components/ui/textarea";
import LineChart from "@/components/atoms/LineChart/LineChart";
import {IStartup} from "@/interfaces";
import {useSearchParams} from "next/navigation";

interface PageProps {
  searchParams: any,
}

const KPIS = [
  {
    kpiName: "Monthly Visits",
    kpiValue: 100,
    isNorthStar: true
  },
  {
    kpiName: "Daily Visits",
    kpiValue: 3,
    isNorthStar: false
  },
]

const Page = ({}: PageProps) => {
  const [date, setDate] = React.useState<Date>()
  const [startupData, setStartupData] = React.useState<IStartup | null>()
  const [reportData, setReportData] = React.useState<any>()
  const [compareDate, setCompareDate] = React.useState("1")
  const [seeMore, setSeeMore] = React.useState(false)
  const [graphData, setGraphData] = React.useState()
  const [modalOpen, setModalOpen] = React.useState(false)
  const [selectedKpi, setSelectedKpi] = React.useState("")
  const searchParams = useSearchParams()

  React.useEffect(() => {

    getStartupInfo(parseInt(searchParams.get("id") ?? "1")).then(result => {
      if (result)
        setStartupData(result)
      else {
        setStartupData(null)
      }
    })
  }, [])

  React.useEffect(() => {
    const today = new Date()
    const prevDate = new Date()
    prevDate.setMonth(prevDate.getMonth() - parseInt(compareDate))

    compareReports(parseInt(searchParams.get("id") ?? "1"), [Math.floor(prevDate.getTime() / 1000), Math.floor(today.getTime() / 1000)]).then(result => {
      if (result)
        setReportData(result)
      else {
        setReportData(null)
      }
    })
  }, [compareDate])

  function getGraphData(kpiName: string) {
    getKpiData(parseInt(searchParams.get("id") ?? "1"), kpiName).then(data => {
      setGraphData(data)
      setModalOpen(true)
    })
  }

  if (startupData === undefined) {
    return (
      <>
        <Sidebar pathname={"/startup-settings"} />
        <Content>
        </Content>
      </>
    )
  }

  if (startupData === null) {
    return (
      <>
        <Sidebar pathname={"/startup-settings"} />
        <Content>
          <h1 style={{color: "lightgrey"}}>No data</h1>
        </Content>
      </>
    )
  }

  const kpis: any = {}
  const dateKeys = Object.keys(reportData ?? {})

  if (reportData) {

    if (reportData[dateKeys[0]] !== null) {
      for (let i = 0; i < reportData[dateKeys[0]].kpis.length; i++) {
        if (seeMore || (!seeMore && (
          reportData[dateKeys[0]].kpis[i].name === "Monthly Cost"
          || reportData[dateKeys[0]].kpis[i].name === "Revenue"
          || reportData[dateKeys[0]].kpis[i].name === "Cash Burn"
          || reportData[dateKeys[0]].kpis[i].name === "Employee Count"
        ))) {
          // @ts-ignore
          if (kpis[reportData[dateKeys[0]].kpis[i].name] === undefined)
            // @ts-ignore
            kpis[reportData[dateKeys[0]].kpis[i].name] = {}

          // @ts-ignore
          kpis[reportData[dateKeys[0]].kpis[i].name].startValue = reportData[dateKeys[0]].kpis[i].kpi_value
        }
      }
    }

    if (reportData[dateKeys[1]] !== null) {
      for (let i = 0; i < reportData[dateKeys[1]].kpis.length; i++) {
        if (seeMore || (!seeMore && (
          reportData[dateKeys[1]].kpis[i].name === "Monthly Cost"
          || reportData[dateKeys[1]].kpis[i].name === "Revenue"
          || reportData[dateKeys[1]].kpis[i].name === "Cash Burn"
          || reportData[dateKeys[1]].kpis[i].name === "Employee Count"
        ))) {
          // @ts-ignore
          if (kpis[reportData[dateKeys[1]].kpis[i].name] === undefined)
            // @ts-ignore
            kpis[reportData[dateKeys[1]].kpis[i].name] = {}
            // @ts-ignore
            kpis[reportData[dateKeys[1]].kpis[i].name].endValue = reportData[dateKeys[1]].kpis[i].kpi_value
        }
      }
    }
  }

  return (
    <>
      <Sidebar pathname={"/startup-settings"} />
      <Content>
        {/*<img src={startupData.logo_url}/>*/}
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <Tabs />
          <div>
            <strong style={{color: "lightgray"}}>Compare with</strong>
            <Select defaultValue={compareDate} onValueChange={val => setCompareDate(val)}>
              <SelectTrigger style={{backgroundColor: "white", marginBottom: 20}} className="w-[300px]">
                <SelectValue placeholder="Compare range"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Previous month</SelectItem>
                <SelectItem value="3">Last 3 months</SelectItem>
                <SelectItem value="6">Last 6 months</SelectItem>
                <SelectItem value="12">Last 12 months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <section className={styles.kpiList}>
          {Object.keys(kpis).map((kpiKey, index) => (
            <KpiCard
              key={index}
              kpiName={kpiKey}
              kpiStartValue={kpis[kpiKey].startValue ?? (kpis[kpiKey].endValue ?? 0)}
              kpiEndValue={kpis[kpiKey].endValue}
              onClick={(kpiName) => {
                getGraphData(kpiName)
                setSelectedKpi(kpiName)
              }}
            />
          ))}
          <Dialog open={modalOpen} onOpenChange={open => setModalOpen(open)}>
            <DialogTrigger>Open</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{selectedKpi} - All Time Graph</DialogTitle>
                <DialogDescription>
                  {graphData ?
                    <LineChart graphData={graphData}/>
                    : null
                  }

                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </section>
        <Button style={{marginTop: 20}}
                onClick={() => setSeeMore(prevState => !prevState)}>See {seeMore ? "less" : "more"}</Button>
        <hr style={{marginBlock: 20}}/>
        <h2 className={styles.title}>General Info</h2>
        <div className={styles.startupInfoWrapper}>
          <div className={styles.startupDetail}>
            <span>Name</span>
            <strong>{startupData.name}</strong>
          </div>
          <div className={styles.startupDetail}>
            <span>Business Model</span>
            <strong>{startupData.business_model}</strong>
          </div>
          <div className={styles.startupDetail}>
            <span>Current Employee Count</span>
            <strong>{startupData.current_employee_count}</strong>
          </div>
          <div className={styles.startupDetail}>
            <span>Company Description</span>
            <strong>{startupData.description}</strong>
          </div>
          <div className={styles.startupDetail}>
            <span>Industry</span>
            <strong>{startupData.industry}</strong>
          </div>
          <div className={styles.startupDetail}>
            <span>Stage</span>
            <strong>{startupData.start_up_status}</strong>
          </div>
          <div className={styles.startupDetail}>
            <span>Total Funding</span>
            <strong>{startupData.total_founding}</strong>
          </div>
          <div className={styles.startupDetail}>
            <span>Website Url</span>
            <strong>{startupData.web_site_url}</strong>
          </div>
          <div className={styles.startupDetail}>
            <span>Previous Accelerator Programs</span>
            <strong>{startupData.old_accelerator_programs}</strong>
          </div>
          <div className={styles.startupDetail}>
            <span>HQ Country</span>
            <strong>{startupData.hq_country}</strong>
          </div>
          <div className={styles.startupDetail}>
            <span>Founding Stage</span>
            <strong>{startupData.founding_stage}</strong>
          </div>
          <div className={styles.startupDetail}>
            <span>Founding Date</span>
            <strong>{startupData.founding_date}</strong>
          </div>
        </div>
      </Content>

    </>
  );
};

export default Page;