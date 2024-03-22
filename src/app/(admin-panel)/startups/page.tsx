"use client";
import React from 'react';
import Sidebar from "@/app/(admin-panel)/Sidebar";
import Content from "@/app/(admin-panel)/Content";
import {Checkbox} from "@/components/ui/checkbox";
import styles from "./page.module.scss";
import {IStartup} from "@/interfaces";
import StartupCard from "@/app/(admin-panel)/startups/StartupCard";
import {getAllStartUps} from "@/api/startupAPI";

const FILTER_OPTIONS: { [key: string]: any} = {
  // "General Information": {
  //   "Top Companies By Revenue": "topCompaniesByRevenue",
  //   "Top Companies by Valuation": "topCompaniesByValuation",
  //   "Is Hiring": "isHiring",
  //   "Nonprofit": "nonprofit",
  // },
  // "Founder Diversity": {
  //   "Black-founded": "blackFounded",
  //   "Hispanic & Latino-founded": "hispanicFounded",
  //   "Women-founded": "womenFounded",
  // },
  // "Batch": {
  //   "All batches": "allBatches",
  //   "W24": "W24",
  //   "S23": "S23",
  //   "W23": "W23",
  //   "S22": "S22",
  // },
  "Industry": {
    "All industries": "allIndustries",
    "B2B": "b2b",
    "Education": "education",
    "Fintech": "fintech",
    "Consumer": "consumer",
    "Healthcare": "healthcare",
    "Real Estate and Construction": "realEstate",
    "Industrials": "industrials",
    "Government": "government"
  },
  "Region": {
    "Anywhere": "anywhere",
    "America / Canada": "americaCanada",
    "Remote": "remote",
    "Europe": "europe",
    "South Asia": "southAsia",
    "Latin America": "latinAmerica",
    "Southeast Asia": "southeastAsia",
    "Africa": "africa",
    "Middle East and North Africa": "middleEastAndNorthAfrica",
    "East Asia": "eastAsia",
    "Oceania": "oceania",
  }

}
export default function StartupsPage() {
  const [filters, setFilters] = React.useState({
  })
  const [startupList, setStartupList] = React.useState([])

  React.useEffect(() => {
    getAllStartUps().then(resp => setStartupList(resp))
  }, [])

  return (
    <>
      <Sidebar pathname={"/startups"} />
      <Content>
        <div className={styles.directoryView}>
          <div className={styles.filterForm}>
            {Object.keys(FILTER_OPTIONS).map(option => (
              <div key={option}>
                <strong>{option}</strong>
                {
                  Object.keys(FILTER_OPTIONS[option]).map(filter => (
                    <div key={filter}>
                      <input type="checkbox" id={FILTER_OPTIONS[option][filter]}/>
                      <label htmlFor={FILTER_OPTIONS[option][filter]}>{filter}</label>
                    </div>
                  ))
                }
              </div>

            ))}
          </div>
          <div>
            <ul className={styles.startupList}>
              {
                startupList.map((startup, index) => (
                  <li key={index}>
                    <StartupCard startup={startup}/>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </Content>
    </>
  );
}
