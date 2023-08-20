import React, { useState, useEffect } from "react";
import axios from "axios";
import { IndividualText } from "../IndividualText/IndividualText";
import toast, { Toaster } from "react-hot-toast";

export const MainBox = () => {
  const [textareaValue, setTextareaValue] = useState("");
  const [savedTexts, setSavedTexts] = useState([]);

  const fetchSavedTexts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/texts");
      setSavedTexts(response.data);
    } catch (error) {
      console.error(`Failed to fetch saved texts: ${error}`);
      toast.error("Failed to fetch saved texts. Please try again.");
    }
  };

  useEffect(() => {
    fetchSavedTexts();

    // Set up polling interval to fetch saved texts periodically
    const intervalId = setInterval(fetchSavedTexts, 5000); // Fetch every 5 seconds

    return () => {
      clearInterval(intervalId); // Clean up the interval on component unmount
    };
  }, []);

  const saveText = async () => {
    try {
      await axios.post("http://localhost:3001/save", {
        text: textareaValue,
      });
      setTextareaValue("");
      fetchSavedTexts();
      toast.success("Text saved successfully!");
    } catch (error) {
      console.error(`Failed to save text: ${error}`);
      toast.error("Failed to save text. Please try again.");
    }
  };

  const deleteAllText = async () => {
    if (savedTexts.length === 0) {
      toast.error("There are no texts to delete.");
      return;
    }

    try {
      await axios.delete("http://localhost:3001/deleteall");
      fetchSavedTexts();
      toast.success("All texts deleted successfully!");
    } catch (error) {
      console.error(`Failed to delete all text: ${error}`);
      toast.error("Failed to delete all texts. Please try again.");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-4xl w-full mx-auto p-8 bg-white rounded shadow-lg">
          <Toaster /> {/* Add this line to display toasts */}
          <textarea
            id="textInput"
            className="w-full px-4 py-2 border rounded mb-4 h-32"
            placeholder="Type your text here"
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
          ></textarea>
          <div className="flex justify-center space-x-2">
            <button
              id="saveButton"
              className="px-4 py-2 bg-blue-500 text-white rounded mb-8"
              onClick={saveText}
            >
              Save
            </button>
          </div>
          <div id="savedText">
            {/* Pass the saved texts as a prop */}
            <IndividualText text={savedTexts} />
          </div>
          <button
            id="deleteAllButton"
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            onClick={deleteAllText}
          >
            Delete All
          </button>
        </div>
      </div>
    </>
  );
};
