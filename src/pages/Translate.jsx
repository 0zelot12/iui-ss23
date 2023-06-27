import { useState } from "react";
import { PreviewBox } from "../components/PreviewBox";
import { Spinner } from "../components/Spinner";
import { CameraInput } from "../components/CameraInput";
import { BouncingArrow } from "../components/BouncingArrow";

function Translate() {
  const [classificationResults, setClassificationResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCaptureFrame = (frame) => {
    setIsLoading(true);
    fetch("http://127.0.0.1:5000/process", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: frame }),
    }).then((response) =>
      response.json().then((classificationResult) => {
        // TODO: Handle errors
        if (classificationResult.error === "NO_LANDMARKS") {
          setError("No hand detected, please try again.");
        } else {
          setClassificationResults([
            ...classificationResults,
            { label: classificationResult.classification },
          ]);
          setError(null);
        }
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
        {classificationResults.length === 0 ? (
          <>
            <BouncingArrow />
            <p className="text-blue-950 text-xl text-center">
              Tap to capture an image.
            </p>
          </>
        ) : (
            <PreviewBox items={classificationResults} />
        )}
        {error && <p className="text-red-500 font-bold">{error}</p>}
        <Spinner active={isLoading} />
      </div>
    </>
  );
}

export { Translate };
