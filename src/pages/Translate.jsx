import { useState } from "react";
import { PreviewBox } from "../components/PreviewBox";
import { Spinner } from "../components/Spinner";
import { CameraInput } from "../components/CameraInput";

function Translate() {
  const [classificationResults, setClassificationResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleCaptureFrame = (frame) => {
    setIsLoading(true);
    fetch("http://localhost:5000/process", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: frame }),
    }).then((response) =>
      response.json().then((classificationResult) => {
        // TODO: Handle errors
        setClassificationResults([
          ...classificationResults,
          { label: classificationResult.classification },
        ]);
        setIsLoading(false);
      })
    );
  };

  return (
    <>
      <CameraInput
        facingMode="environment"
        disabled={isLoading}
        onCaptureFrame={handleCaptureFrame}
      />
      <div className="container p-2 space-y-2 mx-auto flex flex-col items-center">
        <p className="text-blue-950 text-xl text-center">
          Tap to capture an image.
        </p>
        <PreviewBox items={classificationResults}></PreviewBox>
        <Spinner active={isLoading} />
      </div>
    </>
  );
}

export { Translate };
