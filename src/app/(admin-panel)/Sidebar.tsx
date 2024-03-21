import React from 'react';
import styles from './page.module.scss';
import Link from "next/link";
import {Roles, USER_ROLE} from "@/constants";

interface SidebarProps {
  pathname: any
}

const SIDEBAR_MENU_OPTIONS = [
  {pathname: "/meetings", label: "Meetings", icon: "👥", roles: [Roles.MENTOR, Roles.INVESTOR]},
  {pathname: "/available-slots", label: "Available Slots", icon: "📅", roles: [Roles.MENTOR, Roles.INVESTOR]},
  {pathname: "/startups", label: "Startups", icon: "🚀", roles: [Roles.INVESTOR]},
  {pathname: "/partner-settings", label: "Partner Settings", icon: "⚙️🤝", roles: []},
  {pathname: "/mentor-settings", label: "Mentor Settings", icon: "⚙️🧑‍🏫", roles: []},
  {pathname: "/startup-settings", label: "Startup Settings", icon: "⚙️🚀 ", roles: []},
]
const Sidebar = ({pathname}: SidebarProps) => {
  return (
    <div className={styles.sidebar}>
      <ul>
        {
          SIDEBAR_MENU_OPTIONS.map(option => option.roles.includes(USER_ROLE) || USER_ROLE === Roles.ADMIN ? (
            <li
              key={option.pathname}
              className={pathname === option.pathname ? styles.active : ""}
            >
              <Link href={option.pathname}>{option.icon}&nbsp;&nbsp;{option.label}</Link>
            </li>
          ) : null)
        }
      </ul>
    </div>
  );
};

export default Sidebar;