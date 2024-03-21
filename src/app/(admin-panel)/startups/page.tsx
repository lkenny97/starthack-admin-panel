"use client";
import React from 'react';
import Sidebar from "@/app/(admin-panel)/Sidebar";
import Content from "@/app/(admin-panel)/Content";
import {Checkbox} from "@/components/ui/checkbox";
import styles from "./page.module.scss";
import {IStartup} from "@/interfaces";
import StartupCard from "@/app/(admin-panel)/startups/StartupCard";

const FILTER_OPTIONS: { [key: string]: any} = {
  "General Information": {
    "Top Companies By Revenue": "topCompaniesByRevenue",
    "Top Companies by Valuation": "topCompaniesByValuation",
    "Is Hiring": "isHiring",
    "Nonprofit": "nonprofit",
  },
  "Founder Diversity": {
    "Black-founded": "blackFounded",
    "Hispanic & Latino-founded": "hispanicFounded",
    "Women-founded": "womenFounded",
  },
  "Batch": {
    "All batches": "allBatches",
    "W24": "W24",
    "S23": "S23",
    "W23": "W23",
    "S22": "S22",
  },
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

const STARTUPS: IStartup[] = [
  {
    "name":"TheStartFellows",
    "logo_url":"cdn.teklifimgelsin.com",
    "industry":"Fintech",
    "description":"We are incubation and accelartion platform serving for both investors and start ups. Our wide range mentor network helps startups to achieve goals",
    "web_site_url":"https://teklifimgelsin.com",
    "hq_country":"Turkiye",
    "founding_date":"04-01-2021",
    "founding_stage":"Series A",
    "start_up_status":"Growing",
    "total_founding":"12000000",
    "current_employee_count":24,
    "business_model":"B2C",
    "old_accelerator_programs":"ITU Cekirdek",
    "fs_incubation_participant":false,
    "fs_accelerator_participant":"NO",
    "equity_free_investments_by_fs":"15000",
    "pitch_deck_url":"cdn.teklifimgelsin.com/deck/tg_deck_24"
  },
  {
    "name":"TheStartFellows",
    "logo_url":"cdn.teklifimgelsin.com",
    "industry":"Fintech",
    "description":"We are incubation and accelartion platform serving for both investors and start ups. Our wide range mentor network helps startups to achieve goals",
    "web_site_url":"https://teklifimgelsin.com",
    "hq_country":"Turkiye",
    "founding_date":"04-01-2021",
    "founding_stage":"Series A",
    "start_up_status":"Growing",
    "total_founding":"12000000",
    "current_employee_count":24,
    "business_model":"B2C",
    "old_accelerator_programs":"ITU Cekirdek",
    "fs_incubation_participant":false,
    "fs_accelerator_participant":"NO",
    "equity_free_investments_by_fs":"15000",
    "pitch_deck_url":"cdn.teklifimgelsin.com/deck/tg_deck_24"
  },
  {
    "name":"TheStartFellows",
    "logo_url":"cdn.teklifimgelsin.com",
    "industry":"Fintech",
    "description":"We are incubation and accelartion platform serving for both investors and start ups. Our wide range mentor network helps startups to achieve goals",
    "web_site_url":"https://teklifimgelsin.com",
    "hq_country":"Turkiye",
    "founding_date":"04-01-2021",
    "founding_stage":"Series A",
    "start_up_status":"Growing",
    "total_founding":"12000000",
    "current_employee_count":24,
    "business_model":"B2C",
    "old_accelerator_programs":"ITU Cekirdek",
    "fs_incubation_participant":false,
    "fs_accelerator_participant":"NO",
    "equity_free_investments_by_fs":"15000",
    "pitch_deck_url":"cdn.teklifimgelsin.com/deck/tg_deck_24"
  },
]

export default function StartupsPage() {
  const [filters, setFilters] = React.useState({

  })

  return (
    <>
      <Sidebar pathname={"/startups"} />
      <Content>
        <div className={styles.filterForm}>
          {Object.keys(FILTER_OPTIONS).map(option => (
            <div key={option}>
              <strong>{option}</strong>
              {
                Object.keys(FILTER_OPTIONS[option]).map(filter => (
                  <div key={filter}>
                    <Checkbox id={FILTER_OPTIONS[option][filter]} />
                    <label htmlFor={FILTER_OPTIONS[option][filter]}>{filter}</label>
                  </div>
                ))
              }
            </div>

          ))}
        </div>
        <div>
          <ul>
            {
              STARTUPS.map((startup, index) => (
                <li key={index}>
                  <StartupCard startup={startup} />
                </li>
              ))
            }
          </ul>
        </div>
      </Content>
    </>
  );
}
