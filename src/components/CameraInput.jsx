import React, { useEffect, useRef, useState } from "react";

function CameraInput(props) {
  const [imagesTaken, setImagesTaken] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({
          video: {
            facingMode: props.facingMode,
          },
        })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      console.error("This device does not support camera input.");
    }
  }, [props.facingMode]);

  const handleFrame = async () => {
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    canvasRef.current
      .getContext("2d")
      .drawImage(
        videoRef.current,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

    const imageData = canvasRef.current.toDataURL();
    const newImage = {
      data: imageData,
    };
    setImagesTaken([...imagesTaken, newImage]);
  };

  const onTranslate = async () => {
    setIsLoading(true);
    window.navigator?.vibrate?.(100);
    // TODO: Send data to server
    fetch("http://localhost:5000/process", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ images: imagesTaken }),
    }).then((response) =>
      response.json().then((data) => {
        console.log(data);
        // TODO: Handle errors
        setIsLoading(false);
      })
    );
  };

  const onCapture = () => {
    window.navigator?.vibrate?.(100);
    handleFrame();
  };

  return (
    <>
      <div className="space-y-2 text-center">
        <video
          ref={videoRef}
          autoPlay
          className="border-2 border-blue-500 bg-cover rounded"
        ></video>
        <p className="text-xl text-blue-950 font-semibold">
          Capture a series of photos to translate...
        </p>
        {/* TODO: Make area to click really big */}
        <div className="grid grid-cols-2 gap-x-2">
          <button
            className="bg-blue-400 px-8 py-8 rounded text-white font-semibold"
            onClick={onCapture}
          >
            Capture
          </button>
          <button
            className="bg-blue-800 px-8 py-8 rounded text-white font-semibold"
            onClick={onTranslate}
          >
            Translate
          </button>
        </div>
      </div>
      <p className="text-xl text-blue-950 font-semibold">
        You took {imagesTaken.length} images.
      </p>
      {isLoading && (
        <p className="text-blue-900 font-semibold animate-bounce">
          Sending request...
        </p>
      )}
      <canvas ref={canvasRef} className="hidden" />
    </>
  );
}

export default CameraInput;
