import { useState } from "react";
import { PreviewBox } from "../components/PreviewBox";
import { Spinner } from "../components/Spinner";
import { CameraInput } from "../components/CameraInput";

function Translate() {
  const [imagesTaken, setImagesTaken] = useState([]);

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

  const handleCaptureFrame = (frame) => {
    setImagesTaken([...imagesTaken, frame]);
  };

  return (
    <>
      <CameraInput
        onCaptureFrame={handleCaptureFrame}
        facingMode="environment"
      />
      <div className="container p-2 space-y-2 mx-auto flex flex-col items-center">
        <p className="text-blue-950 text-xl text-center">
          Tap to capture an image.
        </p>
        <PreviewBox
          items={[
            { id: 1, label: "A" },
            { id: 2, label: "B" },
            { id: 3, label: "C" },
          ]}
        ></PreviewBox>
        <Spinner active={true} />
      </div>
    </>
  );
}

export { Translate };
