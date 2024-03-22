"use client";

import React from 'react';
import styles from './page.module.scss';
import Link from "next/link";
import {Roles} from "@/constants";
import useUser from "@/hooks/useUser";
import { Button } from '@/components/ui/button';
import {logout} from "@/api/userAPI";

interface SidebarProps {
  pathname: any
}

const SIDEBAR_MENU_OPTIONS = [
  {pathname: "/meetings", label: "Meetings", icon: "👥", roles: [Roles.ADMIN, Roles.MENTOR, Roles.INVESTOR]},
  {pathname: "/available-slots", label: "Available Slots", icon: "📅", roles: [Roles.ADMIN, Roles.MENTOR, Roles.INVESTOR]},
  {pathname: "/startups", label: "Startups", icon: "🚀", roles: [Roles.ADMIN, Roles.INVESTOR]},
  {pathname: "/partner-settings", label: "Partner Settings", icon: "⚙️🤝", roles: [Roles.ADMIN, ]},
  {pathname: "/mentor-settings", label: "Mentor Settings", icon: "⚙️🧑‍🏫", roles: [Roles.ADMIN, ]},
  {pathname: "/startup-settings", label: "Startup Settings", icon: "⚙️🚀 ", roles: [Roles.ADMIN, ]},
]
const Sidebar = ({pathname}: SidebarProps) => {
  const {user, mutateUser} = useUser()
  return (
    <div className={styles.sidebar}>
      <ul>
        {
          SIDEBAR_MENU_OPTIONS.map(option => option.roles.includes(user?.type) ? (
            <li
              key={option.pathname}
              className={pathname === option.pathname ? styles.active : ""}
            >
              <Link href={option.pathname}>{option.icon}&nbsp;&nbsp;{option.label}</Link>
            </li>
          ) : null)
        }
        <li>
          <Button
            style={{
              width: "100%",
              backgroundColor: "transparent",
              border: "1px solid lightgrey"
            }}
            onClick={() => {
              logout()
              mutateUser()
            }}
          >
            Logout
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;