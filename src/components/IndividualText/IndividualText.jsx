import axios from "axios";
import { useEffect, useState } from "react";
import { FaCopy } from "react-icons/fa";
import toast from "react-hot-toast";

export const IndividualText = ({ text }) => {
  const [texts, setTexts] = useState([]);
  const [copiedItemId, setCopiedItemId] = useState(null); // To track the copied item ID

  useEffect(() => {
    // Update the texts state whenever the parent passes new text data
    setTexts(text);
  }, [text]);

  // Delete individual saved text
  const deleteText = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/delete?id=${id}`);
      // Remove the deleted text from the texts state
      setTexts((prevTexts) => prevTexts.filter((item) => item.id !== id));
      toast.success(`Text with ID ${id} deleted successfully!`);
    } catch (error) {
      console.error(`Failed to delete text: ${error}`);
      toast.error("Failed to delete text. Please try again.");
    }
  };

  // Copy text to clipboard
  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text).then(() => {
      console.log("Text copied to clipboard:", text);
      setCopiedItemId(id); // Set the copied item ID
      setTimeout(() => setCopiedItemId(null), 1000); // Reset the copied item ID after animation duration
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {texts.map((item) => (
        <div key={item.id} className="bg-gray-200 p-4 rounded shadow-md">
          <div className="mb-2">
            <pre className="whitespace-pre-wrap break-words overflow-hidden max-h-40">
              {item.text}
            </pre>
          </div>
          <div className="flex justify-between items-center">
            <button
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => deleteText(item.id)}
            >
              Delete
            </button>
            <button
              className={`px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 ${
                copiedItemId === item.id ? "animate-pulse" : ""
              }`}
              onClick={() => copyToClipboard(item.text, item.id)}
            >
              {copiedItemId === item.id ? "✔" : <FaCopy />}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
