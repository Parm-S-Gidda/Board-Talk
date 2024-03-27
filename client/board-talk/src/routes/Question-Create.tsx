import axios from "axios";
import { useState } from "react";
import { POST_GUESTION } from "../utils/endpoints";
import { useUser } from "../hooks/user";
import { useNavigate } from "react-router-dom";

type Form = {
  title: string;
  content: string;
};

function QuestionCreate() {
  const [form, setForm] = useState<Form>({ title: "", content: "" });

  const { user, updateUser } = useUser();

  console.log("user:", user);

  const navigate = useNavigate();

  const onQuestionPosted = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(POST_GUESTION, {
        user_id: user.user_id,
        title: form.title,
        content: form.content,
      });

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      className="h-screen w-screen flex flex-col justify-center items-center gap-y-8"
      onSubmit={onQuestionPosted}
    >
      <input
        className="w-2/5 h-20 bg-gray-200 p-5 rounded-2xl outline-none focus:outline-none"
        placeholder="Title:"
        type="Text"
        name="title"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        value={form.title}
      ></input>

      <textarea
        name="content"
        className="w-2/5 h-20 bg-gray-200 p-5 rounded-2xl outline-none focus:outline-none"
        placeholder="Content:"
        onChange={(e) => setForm({ ...form, content: e.target.value })}
        value={form.content}
      ></textarea>

      <button className="bg-gray-700 rounded-full text-gray-50 p-5 w-32">
        {" "}
        Submit
      </button>
    </form>
  );
}

export default QuestionCreate;
