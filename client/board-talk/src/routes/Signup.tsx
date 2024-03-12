import { useState } from "react";
import axios from "axios";
import { SIGN_UP_END_POINT } from "../utils/endpoints";
import { useUser } from "../hooks/user";
import { useNavigate } from "react-router-dom";

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

    try {
      const resp = await axios.post(SIGN_UP_END_POINT, form);
      updateUser(resp.data);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      className="h-screen w-screen flex flex-row justify-center items-center"
      onSubmit={onSignUp}
    >
      <div className="flex flex-col gap-y-3">
        <input
          type="text"
          name="name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Name"
          className="w-56 h-12 border-b-2 border-gray-400 outline-none focus:outline-none"
        ></input>
        <input
          type="text"
          name="email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
          className="w-56 h-12 border-b-2 border-gray-400 outline-none focus:outline-none"
        ></input>
        <input
          type="text"
          name="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="Password"
          className="w-56 h-12 border-b-2 border-gray-400 outline-none focus:outline-none"
        ></input>

        <button className="bg-gray-900 w-56 h-12 rounded-full mt-8">
          <span className="text-white">Sign up</span>
        </button>
      </div>
    </form>
  );
}

export default SignUp;
