import { useRef, useState } from "react";

import CameraInput from "./components/CameraInput";
import Header from "./components/Header";
import Footer from "./components/Navbar"

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
      <CameraInput ref={videoInputRef} facingMode="environment" />
      <div className="container p-2 space-y-2 mx-auto flex flex-col items-center">
        {imagesTaken.length === 0 && <p className="text-blue-950 text-xl text-center">Tap anywhere on the screen to capture an image.</p>}
        {imagesTaken.length > 0 && <p className="text-blue-950 text-xl text-center">You took {imagesTaken.length} pictures.</p>}
      </div>
      <Footer></Footer>
    </>
  );
}

export default App;
