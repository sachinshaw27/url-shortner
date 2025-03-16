
import { useState } from "react";
import axios from "axios";


export default function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [qrCodeImg, setQrCodeImg] = useState("");

  const handleSubmit = () => {
    axios
      .post("http://localhost:3000/api/short", { originalUrl })
      .then((res) => {
        setShortUrl(res.data.shortUrl);
        setQrCodeImg(res.data.qrCodeImg);
        console.log("API response", res.data);
      })
      .catch((err) => console.error("Error:", err));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-200 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          🔗 URL Shortener
        </h1>

        {/* Input Field */}
        <input
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          type="text"
          placeholder="Enter your URL here..."
          className="border border-gray-300 p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />

        {/* Shorten Button */}
        <button
          onClick={handleSubmit}
          className="bg-indigo-600 text-white w-full py-3 mt-4 rounded-xl text-lg font-medium hover:bg-indigo-700 transition duration-300"
        >
          Shorten URL
        </button>
        


        {/* Display Shortened URL & QR Code */}
        {shortUrl && (
          <div className="mt-6 text-center">
            <p className="text-lg font-medium text-gray-700">Shortened URL:</p>
            <a
              href={shortUrl}
              rel="noopener noreferrer"
              className="text-indigo-500 font-semibold underline mt-2 block hover:text-indigo-700 transition"
              target="_blank"
            >
              {shortUrl}
            </a>
            {qrCodeImg && (
              <img
                src={qrCodeImg}
                alt="Generated QR Code"
                className="mt-4 w-32 h-32 mx-auto shadow-lg rounded-lg border border-gray-300"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

