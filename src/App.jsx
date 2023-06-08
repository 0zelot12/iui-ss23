import { useRef, useState } from "react";

import CameraInput from "./components/CameraInput";

function App() {
  const [imagesTaken, setImagesTaken] = useState([]);

  const videoInputRef = useRef(null);

  const onTranslate = async () => {
    window.navigator?.vibrate?.(100);
    fetch("http://localhost:5000/process", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ images: imagesTaken }),
    }).then((response) =>
      response.json().then((data) => {
        // TODO: Handle errors
        console.log(data);
      })
    );
  };

  const onCapture = () => {
    window.navigator?.vibrate?.(100);
    const newImage = videoInputRef.current.handleFrame();
    setImagesTaken([...imagesTaken, newImage]);
  };

  return (
    <>
      <div className="container p-2 space-y-2 mx-auto flex flex-col items-center">
        <CameraInput ref={videoInputRef} facingMode="environment" />
        <div className="grid grid-cols-2 space-x-2">
          <button
            className="bg-blue-500 px-4 py-2 rounded text-white"
            onClick={onCapture}
          >
            Capture
          </button>
          <button
            className="bg-blue-500 px-4 py-2 rounded text-white"
            onClick={onTranslate}
          >
            Translate
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
