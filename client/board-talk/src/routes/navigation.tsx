import axios, { AxiosResponse } from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import { LOGOUT } from "../utils/endpoints";
import Cookies from "js-cookie";

type Message = {
  message: string;
};

export default function Navigation() {
  const navigate = useNavigate();
  const onLogout = async () => {
    try {
      const response: AxiosResponse<Message> = await axios.post(
        LOGOUT,
        {},
        {
          headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
        }
      );

      console.log(response.data.message);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const onWhiteBoard = () => {
    navigate("/home/whiteboard");
  };
  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex justify-end bg-white h-1/12 shadow-md">
        <div className="flex h-full items-center">
          <div className="flex gap-x-14 pr-20">
            <span className="text-gray-700 hover:cursor-pointer">
              Dashboard
            </span>
            <span
              className="text-gray-700 hover:cursor-pointer"
              onClick={onWhiteBoard}
            >
              Whiteboard
            </span>
            <span
              className="text-gray-700 hover:cursor-pointer"
              onClick={onLogout}
            >
              Log out
            </span>
          </div>
        </div>
      </div>
      <div className="h-11/12 w-full">
        <Outlet />
      </div>
    </div>
  );
}
