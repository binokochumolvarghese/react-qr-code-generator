import { useState } from "react";

const Home = () => {
  const baseUrl = "https://api.apgy.in/qr/";

  const [qrText, setQrText] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [error, setError] = useState(null);

  // Function to generate QR code
  const onClickHandler = () => {
    if (!qrText) {
      setError("Please enter text to generate QR code.");
      setQrCode(null);
      return;
    }
    setError(null);
    setQrCode(null);

    const params = {
      data: qrText,
      size: 300,
    };

    const queryString = new URLSearchParams(params).toString();
    const fullUrl = `${baseUrl}?${queryString}`;

    fetch(fullUrl, {
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
          setQrCode(response.url);
        } else {
          throw new Error("Failed to generate QR code.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("There was a problem generating the QR code.");
      });
  };
 
  // Function to handle downloading the QR code image
  const handleDownload = () => {
    fetch(qrCode)
      .then((response) => response.blob()) 
      .then((blob) => {
        const url = window.URL.createObjectURL(blob); 
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "qr-code.png"); 
        document.body.appendChild(link);
        link.click(); // Trigger the download
        link.parentNode.removeChild(link); 
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error while downloading the QR code:", error);
      });
  };

  return (
    <div className=" flex flex-col items-center justify-start min-h-screen bg-gray-100 p-10">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <input
          type="text"
          name="qrText"
          value={qrText}
          onChange={(e) => setQrText(e.target.value)}
          placeholder="Enter text for QR code"
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          onClick={onClickHandler}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Generate
        </button>

        {/* Display error message */}
        {error && <p className="text-red-500 mt-4">{error}</p>}

        {/* Show QR code image only if qrCode is available */}
        {qrCode && (
          <div className="mt-6 text-center">
            <img
              src={qrCode}
              alt="Generated QR Code"
              className="mx-auto mb-4"
            />
            <button
              onClick={handleDownload}
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Download QR Code
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
