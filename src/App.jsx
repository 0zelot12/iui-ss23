import { useRef, useState } from "react";

import CameraInput from "./components/CameraInput";
import Header from "./components/Header";
import Navbar from "./components/Navbar"

function App() {
  const [imagesTaken, setImagesTaken] = useState([]);

  let touchDuration = 0;
  let touchTimer = null;

  const videoInputRef = useRef(null);

  const handleOnTouchStart = () => {
    touchTimer = setInterval(() => {
      touchDuration++;
      if (touchDuration > 500) {
        clearInterval(touchTimer);
        touchTimer = null;
        touchDuration = 0;
        translate();
      }
    }, 1)
  }

  const handleOnTouchEnd = () => {
    if (touchDuration < 500 && touchTimer) {
      clearInterval(touchTimer);
      touchTimer = null;
      touchDuration = 0;
      captureFrame();
    }
  }

  const translate = async () => {
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

  const captureFrame = () => {
    window.navigator?.vibrate?.(50);
    const newImage = videoInputRef.current.handleFrame();
    setImagesTaken([...imagesTaken, newImage]);
  };

  return (
    <>
      <Header></Header>
      <CameraInput ref={videoInputRef} facingMode="environment" />
      <div className="container p-2 space-y-2 mx-auto flex flex-col items-center">
        {imagesTaken.length === 0 && <p className="text-blue-950 text-xl text-center">Tap anywhere on the screen to capture an image.</p>}
        {imagesTaken.length > 0 && <p className="text-blue-950 text-xl text-center">You took {imagesTaken.length} pictures.</p>}
      </div>
      <Navbar></Navbar>
      <div className="absolute top-0 h-screen w-screen" onTouchStart={handleOnTouchStart} onTouchEnd={handleOnTouchEnd} />
    </>
  );
}

export default App;
