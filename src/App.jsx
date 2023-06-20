import { useRef, useState } from "react";

import CameraInput from "./components/CameraInput";
import Header from "./components/Header";
import { PreviewBox } from "./components/PreviewBox";
import { Spinner } from "./components/Spinner";

function App() {
  const [imagesTaken, setImagesTaken] = useState([]);

  // TODO: Investigate if useState(...) would be a better practise
  let touchDuration = 0;
  let touchTimer = null;

  const videoInputRef = useRef(null);

  const resetTimer = () => {
    clearInterval(touchTimer);
    touchTimer = null;
    touchDuration = 0;
  };

  const handleOnTouchStart = () => {
    touchTimer = setInterval(() => {
      touchDuration++;
      if (touchDuration > 500) {
        window.navigator?.vibrate?.(100);
        resetTimer();
        translate();
      }
    }, 1);
  };

  const handleOnTouchEnd = () => {
    if (touchDuration < 500 && touchTimer) {
      window.navigator?.vibrate?.(50);
      resetTimer();
      captureFrame();
    }
  };

  const translate = async () => {
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
    const newImage = videoInputRef.current.handleFrame();
    setImagesTaken([...imagesTaken, newImage]);
  };

  return (
    <>
      <Header></Header>
      <CameraInput ref={videoInputRef} facingMode="environment" />
      <div className="container p-2 space-y-2 mx-auto flex flex-col items-center">
        {imagesTaken.length === 0 && (
          <p className="text-blue-950 text-xl text-center">
            Tap to capture an image.
          </p>
        )}
        <PreviewBox
          items={[
            { id: 1, label: "A" },
            { id: 2, label: "B" },
            { id: 3, label: "C" },
          ]}
        ></PreviewBox>
        <Spinner active={true} />
      </div>
      <div
        className="absolute top-0 h-screen w-screen"
        onTouchStart={handleOnTouchStart}
        onTouchEnd={handleOnTouchEnd}
      />
    </>
  );
}

export default App;
