import { useRef, useState } from "react";

import CameraInput from "./components/CameraInput";
import Header from "./components/Header";
import Footer from "./components/Footer"

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
      <Header></Header>
      <div className="container p-2 space-y-2 mx-auto flex flex-col items-center">
        <CameraInput ref={videoInputRef} facingMode="environment" />
        {imagesTaken.length === 0 && <p className="text-blue-950 text-xl text-center">Capture a gesture you want to translate.</p>}
        {imagesTaken.length > 0 && <p className="text-blue-950 text-xl text-center">You took {imagesTaken.length} pictures.</p>}
        <div className="grid grid-cols-2 space-x-2 w-full lg:w-fit">
          <button
            className="bg-blue-500 px-8 py-4 rounded text-white"
            onClick={onCapture}
          >
            Capture
          </button>
          <button
            className="bg-blue-800 px-4 py-2 rounded text-white"
            onClick={onTranslate}
          >
            Translate
          </button>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default App;
