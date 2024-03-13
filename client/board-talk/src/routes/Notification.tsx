import Button from "../components/NotificationButton";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Notification = {
  title: string
  body: string
}

var notificationsReceived: Notification

function Notification() {
    GetNotifications()

    return (
        <div id="content">
            <h1>Notifications:</h1>
            <br></br>

            <div id="notificationInfo">
                <p>Title: {notificationsReceived.title}</p>
                <p>Body: {notificationsReceived.body}</p>
            </div>

        </div>
    );
}

function GetNotifications() {
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

export default Notification;
