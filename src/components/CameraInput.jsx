import React, { useEffect, useRef } from "react";

function CameraInput(props) {
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

  const handleFrame = () => {
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
    canvasRef.current.toBlob((blob) => {
      //TODO: Send data via websocket
      console.log(blob);
    }, "image/jpeg");
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
          className="border-2 border-blue-500 lg:max-h-96 rounded"
        ></video>
        <p className="text-xl text-blue-950 font-semibold">
          Capture a series of photos to translate...
        </p>
        {/* TODO: Make area to click really big */}
        <div className="flex flex-col space-y-2">
          <button
            className="bg-blue-400 px-8 py-8 rounded text-white font-semibold"
            onClick={onCapture}
          >
            Capture
          </button>
          <button
            className="bg-blue-800 px-8 py-8 rounded text-white font-semibold"
            onClick={onCapture}
          >
            Translate
          </button>
        </div>
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </>
  );
}

export default CameraInput;
