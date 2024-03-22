import apiClient from "@/api/apiClient";

export async function getStartupInfo(startup_id: number) {
  return apiClient
    .post('/startups/getInfo', {startup_id})
    .then(response => {
      if (response) {
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function getAllStartUps() {
  return apiClient
    .get('/getAllStartUps')
    .then(response => {
      if (response) {
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function compareReports(startup_id: number, ranges: number[]) {
  return apiClient
    .post('/startups/compareReports', {startup_id, ranges})
    .then(response => {
      if (response) {
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}


export async function getKpiData(startup_id: number, kpi_name: string) {
  return apiClient
    .post('/startups/getKpiData', {startup_id, kpi_name})
    .then(response => {
      if (response) {
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}
