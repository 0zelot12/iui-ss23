import { useEffect, useRef } from "react";

function CameraInput({ facingMode, onCaptureFrame, disabled }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({
          video: {
            facingMode: facingMode,
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
  }, [facingMode]); // Why do we need this?

  const handleClick = () => {
    if (!disabled) {
      window.navigator?.vibrate?.(50);
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

      onCaptureFrame({
        data: canvasRef.current.toDataURL(),
      });
    }
  };

  return (
    <>
      <video
        className="mx-auto lg:max-h-[512px] md:mt-2"
        ref={videoRef}
        autoPlay
        onClick={handleClick}
      ></video>
      <canvas ref={canvasRef} className="hidden" />
    </>
  );
}

export { CameraInput };
