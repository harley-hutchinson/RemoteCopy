import { MainBox } from "../MainBox/MainBox";
import axios from "axios";
import { useEffect, useState } from "react";

export const Landing = () => {
  const [text, setText] = useState([]);

  useEffect(() => {
    const getText = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/texts");
        setText(data);
      } catch (err) {
        console.log(err);
      }
    };
    getText();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Landing Page</h1>
      <p className="text-gray-600 mb-8">
        Simply add the text that you want to save, no matter what the size!
      </p>
      <MainBox text={text} />
    </div>
  );
};
