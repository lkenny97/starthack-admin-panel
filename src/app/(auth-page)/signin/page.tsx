"use client";
import React, {FormEvent} from 'react';
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {login} from "@/api/userAPI";
import {useRouter} from "next/navigation"

interface PageProps {
}

const Page = ({}: PageProps) => {
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<any>) => {
    e.preventDefault()

    if (!e.currentTarget.email.value || !e.currentTarget.password.value)
      return

    const result = await login(e.currentTarget.email.value, e.currentTarget.password.value)

    if (result) {
      router.push("/meetings")
    }
  }

  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh"}}>
      <h1 style={{color: "lightgray"}}>Sign in to the panel</h1>
      <form style={{width: "310px", display: "flex", flexDirection: "column", gap: 16}} onSubmit={handleSubmit}>
        <Input style={{backgroundColor: "lightgray"}} name="email" type="email" placeholder="Email" />
        <Input style={{backgroundColor: "lightgray"}} name="password" type="password" placeholder="Password" />
        <Button style={{width: "100%"}} type="submit">Login</Button>
      </form>
    </div>
  );
};

export default Page;