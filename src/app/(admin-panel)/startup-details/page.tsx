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

const STARTUP = {
  "business_model": "B2C",
  "created_at": "2024-03-21 03:03:45",
  "current_employee_count": 24,
  "description": "We are incubation and accelartion platform serving for both investors and start ups. Our wide range mentor network helps startups to achieve goals",
  "equity_free_investments_by_fs": 15000,
  "founding_date": "2021-01-04 00:00:00",
  "founding_stage": "Series A",
  "fs_accelerator_participant": "NO",
  "fs_incubation_participant": false,
  "hq_country": "Turkiye",
  "id": 13,
  "industry": "Fintech",
  "logo_url": "cdn.teklifimgelsin.com",
  "name": "TheStartFellows",
  "old_accelerator_programs": "ITU Cekirdek",
  "pitch_deck_url": "cdn.teklifimgelsin.com/deck/tg_deck_24",
  "start_up_reports": [
    {
      "kpis": [
        {
          "created_at": "Thu, 21 Mar 2024 18:31:15 GMT",
          "id": 29,
          "kpi_value": 165,
          "monthly_report_id": 13,
          "name": "Monthly Visits",
          "north_star_metric": true
        },
        {
          "created_at": "Thu, 21 Mar 2024 18:31:15 GMT",
          "id": 30,
          "kpi_value": 3,
          "monthly_report_id": 13,
          "name": "Daily Visits",
          "north_star_metric": false
        }
      ],
      "startup_company_id": 13
    }
  ],
  "start_up_status": "Growing",
  "startup_users": [
    {
      "age": 30,
      "are_terms_accepted": null,
      "birthday": "Wed, 24 Nov 1993 00:00:00 GMT",
      "city": "Ankara",
      "country": "Turkiye",
      "email": "biriertugrulhakan@gmail.com",
      "english_proficiency_lvl": null,
      "english_test": null,
      "gender": "Male",
      "id": 12,
      "is_agreed_to_rules": null,
      "is_consent_given": false,
      "linkedin_url": "https://www.linkedin.com/in/ertu%C4%9Frulhakanbiri/",
      "major": "Computer Science",
      "motivation_letter": "I am sure I am a good fit to your app",
      "name": "Hakan",
      "reason_to_fs": "For potentail",
      "reference": "WebSite",
      "role": "CTO/Co-Founder",
      "startUpCompanyId": 13,
      "student_level": "Bachelor",
      "surname": "Biri",
      "telephone": "+905334362688",
      "uni_end_date": "Tue, 17 Jan 2017 00:00:00 GMT",
      "uni_start_date": "Sun, 11 Sep 2011 00:00:00 GMT",
      "university_name": "Turkiye"
    }
  ],
  "total_founding": 12000000,
  "updated_at": "2024-03-21 03:03:45",
  "web_site_url": "https://teklifimgelsin.com"
}
const Page = ({searchParams}: PageProps) => {
  const [date, setDate] = React.useState<Date>()
  const [startupData, setStartupData] = React.useState<IStartup | null>()
  const [reportData, setReportData] = React.useState<any>()
  const [compareDate, setCompareDate] = React.useState("1")
  const [seeMore, setSeeMore] = React.useState(false)
  const [graphData, setGraphData] = React.useState()
  const [modalOpen, setModalOpen] = React.useState(false)
  const [selectedKpi, setSelectedKpi] = React.useState("")

  React.useEffect(() => {
    getStartupInfo(searchParams.id).then(result => {
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

    compareReports(searchParams.id, [Math.floor(prevDate.getTime() / 1000), Math.floor(today.getTime() / 1000)]).then(result => {
      if (result)
        setReportData(result)
      else {
        setReportData(null)
      }
    })
  }, [compareDate])

  function getGraphData(kpiName: string) {
    getKpiData(searchParams.id, kpiName).then(data => {
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
          <Tabs startupId={searchParams.id}/>
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