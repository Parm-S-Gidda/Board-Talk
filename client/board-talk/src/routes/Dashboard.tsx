import Button from "../components/NotificationButton";
import { useNavigate } from "react-router-dom";

type Notification = {
  title: string
  body: string
}

var notificationsReceived: Notification

function Dashboard() {
  const navigate = useNavigate()
  return(
    <>
      <br></br>
      <Button 
        border="solid"
        color="white"
        height = "50px"
        onClick={() => navigate("/notification")}
        radius = "0%"
        width = "200px"
        children = "Notifications"
      />
    </>
  ) 
}


export default Dashboard;
