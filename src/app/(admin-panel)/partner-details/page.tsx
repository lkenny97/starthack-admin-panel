"use client";
import React from 'react';
import Sidebar from "@/app/(admin-panel)/Sidebar";
import Content from "@/app/(admin-panel)/Content";

interface PageProps {
}

const Page = ({}: PageProps) => {
  return (
    <>
      <Sidebar pathname={"/partner-settings"} />
      <Content>

      </Content>
    </>
  );
};

export default Page;