import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";

function CameraInput({ facingMode }, ref) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useImperativeHandle(ref, () => ({ handleFrame }));

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
  }, [facingMode]);

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

    return {
      data: canvasRef.current.toDataURL(),
    };
  };

  // TODO: Calculate maximum width of the video box to prevent overflow

  return (
    <>
      <video
        className="mx-auto rounded lg:max-h-[512px]"
        ref={videoRef}
        autoPlay
      ></video>
      <canvas ref={canvasRef} className="hidden" />
    </>
  );
}

export default forwardRef(CameraInput);
