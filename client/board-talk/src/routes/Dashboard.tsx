import Button from "../components/NotificationButton";
import React, { useState, useEffect } from "react";

type Notification = {
  title: string
  body: string
}

var notificationsReceived: Notification

function Dashboard() {
  notificationsReceived = ShowNotifications() as Notification
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

  useEffect(() => {
    fetch("/notifications").then((res) =>
      res.json().then((data) => {
        setdata({
          title: data.title,
          body: data.body,
        });
        console.log(data)
      })
    );
  }, []);


  return data
}

export default Dashboard;
