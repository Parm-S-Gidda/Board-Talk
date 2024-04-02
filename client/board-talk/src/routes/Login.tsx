import { useState } from "react";
import { useNavigate } from "react-router-dom";

type FormType = {
  name: string;
  email: string;
  password: string;
};

export default function Login() {
  const [form, setForm] = useState<FormType>({
    email: "",
    name: "",
    password: "",
  });

  const navigate = useNavigate();

  const onSignUp = () => {
    navigate("/signup");
  };
  return (
    <form
      className="h-full w-full flex flex-row justify-center items-center"
      // onSubmit={onSignUp}
    >
      <div className="flex flex-col gap-y-3 bg-white shadow-2xl px-14 py-7 rounded-xl">
        <span className="text-center text-3xl">Log in</span>
        <div className="relative flex mt-10">
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
          <span className="text-white text-nor">Log in</span>
        </button>
        <div className="w-72 flex flex-row justify-center">
          <span className="text-gray-500 text-sm">Don't have an account?</span>
          <span
            className="ml-1 text-sm text-gulf-stream font-semibold hover:cursor-pointer hover:underline"
            onClick={onSignUp}
          >
            Sign up
          </span>
        </div>
      </div>
    </form>
  );
}
