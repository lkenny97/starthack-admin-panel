"use client";

import apiClient from "@/api/apiClient";

export async function login(username: string, password: string) {
  return apiClient
    .get('/login', {
      auth: {
        username,
        password,
      },
    })
    .then(response => {
      if (response) {
        localStorage.setItem('token', response.data.token)
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function logout() {
  return apiClient
    .post('/logout', {})
    .then(response => {
      if (response) {
        localStorage.removeItem('token')
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}


export async function getAllMeetingsOfClient() {
  return apiClient
    .get('/getAllMeetingsOfClient', {})
    .then(response => {
      if (response) {
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function getAllPartners() {
  return apiClient
    .get('/getPartners', {})
    .then(response => {
      if (response) {
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function setMeeting(user_list: number[], start_date: string, purpose: string) {
  return apiClient
    .post('/setMeeting', {user_list, start_date, purpose})
    .then(response => {
      if (response) {
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function addMeetingNote(meeting_id: number, content: string) {
  return apiClient
    .post('/addMeetingNote', {meeting_id, content})
    .then(response => {
      if (response) {
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}


