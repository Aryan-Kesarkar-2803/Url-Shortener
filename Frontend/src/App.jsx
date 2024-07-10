import React, { useState } from "react";
import { useRef } from "react";
import axios from "axios";
function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const urlRef = useRef();
  const handleFormData = async (e) => {
    e.preventDefault();
    const data = await axios.post("/api/geturl", {
      url: url,
    });
    setShortUrl(data.data);
    // setShortUrl(data)
  };

  const handleCopyUrlToClipboard = (e) => {
    e.preventDefault();
    urlRef.current?.select();
    window.navigator.clipboard.writeText(shortUrl);
  };

  const handleResetContent = (e) => {
    e.preventDefault();
    setUrl("");
    setShortUrl("");
  };

  return (
    <div
      className="h-screen w-full fixed text-black bg-cover bg-center "
      style={{
        backgroundImage:
          "url(https://plus.unsplash.com/premium_photo-1709310749375-0942714921d0?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
      }}
    >
      <h1 className="text-6xl font-serif text-center mt-10 text-white font-bold">
        Url Shortener
      </h1>
      <div className="flex flex-col w-3/5   mx-auto mt-28  items-center">
        <div className="w-full ">
          <form
            onSubmit={handleFormData}
            className="flex space-x-6 w-full justify-center"
          >
            <input
              className="text-3xl border-black border-2 px-4 py-2 w-8/12 rounded-2xl opacity-80"
              type="text"
              name="url"
              placeholder="Enter URL"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
              }}
            />
            <button
              type="submit"
              className="text-2xl font-semibold border  border-black px-5 rounded-xl bg-blue-500 active:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="w-full  flex  mt-14 justify-center space-x-6">
          <input
            type="text"
            readOnly
            value={shortUrl}
            ref={urlRef}
            placeholder="Short Url"
            className="text-3xl border border-black rounded-xl  px-3 py-2 w-8/12"
          />
          <button
            onClick={handleCopyUrlToClipboard}
            className="border border-black text-2xl rounded-xl bg-blue-500 active:bg-blue-600 px-6 py-2"
          >
            Copy
          </button>
        </div>
        <div>
          <button
            onClick={handleResetContent}
            className="text-3xl bg-red-500 border border-black rounded text-white px-4 py-2 mt-8 active:bg-red-600"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
