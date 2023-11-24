import axios from "axios";

export async function loginUser(credentials) {

  return axios.post(
    "/login",
    JSON.stringify(credentials),
    {headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    }}
  )
  
}