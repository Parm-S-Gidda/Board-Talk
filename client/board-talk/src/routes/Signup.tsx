import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { SIGN_UP_END_POINT } from "../utils/endpoints";
import { useUser } from "../hooks/user";
import { useNavigate } from "react-router-dom";
import { User } from "./Dashboard";
import Cookies from "js-cookie";

type FormType = {
  name: string;
  email: string;
  password: string;
};

function SignUp() {
  const [form, setForm] = useState<FormType>({
    email: "",
    name: "",
    password: "",
  });

  const { user, updateUser } = useUser();


  const navigate = useNavigate();

  const onSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let retryAttempt = 1;

    while(true){

      try {

        const resp: AxiosResponse<any> = await axios.post(
          SIGN_UP_END_POINT,
          form
        );

        const userResponse: User = {
          name: resp.data.name,
          email: resp.data.email,
          user_id: resp.data.user_id,
          createdAt: resp.data.createdAt,
        };
        updateUser(userResponse);
        Cookies.set("accessToken", resp.data.accessToken);
        navigate("/home/dashboard");

        break;

      } catch (error) {

        console.log("error: " + error);
        if(retryAttempt < 6){
          console.log("Sign up Error. Retrying. Attempt: " + retryAttempt + "/5");
          retryAttempt++;
          continue;
        }
        else{

          alert("Sorry, we ran into an error Signing you up. Please try again later");
          break;
        }

      }
    }
  };

  const onLogin = () => {
    navigate("/login");
  };
  return (
    <form
      className="h-full w-full flex flex-row justify-center items-center"
      onSubmit={onSignUp}
    >
      <div className="flex flex-col gap-y-3 bg-white shadow-2xl px-14 py-7 rounded-xl">
        <span className="text-center text-3xl">Sign up</span>
        <div className="relative flex mt-10">
          <input
            type="text"
            name="name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            value={form.name}
            className="w-72 h-11 border-2 focus:border-blue-green border-gray-300 outline-none rounded-lg px-3 peer"
          ></input>

          <span
            className={`absolute left-3 text-sm text-gray-500 peer-focus:-top-2 peer-focus:transition-all bg-white peer-focus:text-xs ${
              form.name.length == 0 ? "top-2.5 " : "-top-2 text-xs"
            }`}
          >
            Name
          </span>
        </div>

        <div className="relative flex">
          <input
            type="text"
            name="email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-72 h-11 border-2 focus:border-blue-green outline-none rounded-lg px-3 peer border-gray-300"
          ></input>

          <span
            className={`absolute left-3 text-sm text-gray-500 peer-focus:-top-2 peer-focus:transition-all bg-white peer-focus:text-xs ${
              form.email.length == 0 ? "top-2.5 " : "-top-2 text-xs"
            }`}
          >
            Email
          </span>
        </div>
        <div className="relative flex">
          <input
            type="password"
            name="password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-72 h-11 border-2 focus:border-blue-green outline-none rounded-lg px-3 peer border-gray-300"
          ></input>

          <span
            className={`absolute left-3 text-sm text-gray-500 peer-focus:-top-2 peer-focus:transition-all bg-white peer-focus:text-xs ${
              form.password.length == 0 ? "top-2.5 " : "-top-2 text-xs"
            }`}
          >
            Password
          </span>
        </div>

        <button className="w-72 h-12 rounded-lg mt-5 bg-mineral-green">
          <span className="text-white text-nor">Sign up</span>
        </button>
        <div className="w-72 flex flex-row justify-center">
          <span className="text-gray-500 text-sm">
            Already have an account?
          </span>
          <span
            className="ml-1 text-sm text-gulf-stream font-semibold hover:cursor-pointer hover:underline"
            onClick={onLogin}
          >
            Log in
          </span>
        </div>
      </div>
    </form>
  );
}

export default SignUp;
