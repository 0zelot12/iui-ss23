import { useState } from "react";
import { classify } from "../lib/classification";
import { PreviewBox } from "../components/PreviewBox";
import { Spinner } from "../components/Spinner";
import { CameraInput } from "../components/CameraInput";
import { BouncingArrow } from "../components/BouncingArrow";

function Translate() {
  const [classificationResults, setClassificationResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCaptureFrame = async (frame) => {
    setIsLoading(true);
    try {
      const classificationResult = await classify(frame);
      if (classificationResult.error === "NO_LANDMARKS") {
        setError("No hand detected, please try again.");
      } else {
        setClassificationResults([
          ...classificationResults,
          { label: classificationResult.classification },
        ]);
        setError(null);
      }
    } catch (error) {
      setError(`An unexpected error occured: ${error.message}`);
    }
    setIsLoading(false);
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
