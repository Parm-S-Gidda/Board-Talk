import Button from "../components/NotificationButton";
import axios from "axios";
import React, { useState, useEffect } from "react";

type Notification = {
  title: string
  body: string
}

var notificationsReceived: Notification

function Dashboard() {
  ShowNotifications()
  return(
    <>
      <br></br>
      <Button 
        border="solid"
        color="white"
        height = "50px"
        onClick={() => alert(notificationsReceived.title + "  " + notificationsReceived.body)}
        radius = "0%"
        width = "200px"
        children = "Notifications"
      />
    </>
  ) 
}

function ShowNotifications() {
  const [data, setdata] = useState({
      title: "",
      body: ""
  });

  function getData() {
    axios({
      method: "GET",
      url:"/notifications",
    })
    .then((response) => {
      const res =response.data
      setdata(({
        title: res.title,
        body: res.body}))
        notificationsReceived = data as Notification
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}

    getData()
}

export default Dashboard;
