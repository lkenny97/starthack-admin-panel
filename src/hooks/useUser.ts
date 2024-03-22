"use client";
import { useEffect } from 'react'
import useSWR from 'swr'
import apiClient from "@/api/apiClient";
import {Roles} from "@/constants";

interface ResponseError extends Error {
  status?: number;
}

const currentAccount = async () => {
  console.log('token', localStorage.getItem('token'))
  if (!localStorage.getItem('token')) {
    const error: ResponseError = new Error("Not Authorized!")
    error.status = 403
    throw error;
  }


  const response = await apiClient.get('/getCurrentClient')
  if (response) {
    return { ...response.data, isLoggedIn: true, type: Roles.ADMIN }
  }

  // not authorized
  // localStorage.removeItem('token')
  const error: ResponseError = new Error("Not Authorized!")
  error.status = 403
  throw error;
}

export default function useUser({
                                  redirectTo = "",
                                  redirectIfFound = false,
                                } = {}) {

  const { data: user, mutate: mutateUser, error } = useSWR('api_user', currentAccount, {
    shouldRetryOnError: false,
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      // Never retry on 404.
      if (error.status === 404 || error.status === 401 || error.status === 403) return

      // // Never retry for a specific key.
      if (key === 'api_user') return

      // Only retry up to 10 times.
      if (retryCount >= 5) return

      // Retry after 5 seconds.
      setTimeout(() => revalidate({ retryCount }), 5000)
    }})

  const loading = !user && !error;
  const loggedOut = error && error.status === 403;

  if (user?.isLoggedIn && loggedOut)
    mutateUser(null)
  useEffect(() => {
    // if no redirect needed, just return (example: already on /anasayfa)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || loading) return

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && loggedOut) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user?.isLoggedIn)
    ) {
      window.open(redirectTo,"_self")
    }
  }, [user, redirectIfFound, redirectTo, loading, loggedOut])

  return { user, mutateUser, loading, loggedOut }
}