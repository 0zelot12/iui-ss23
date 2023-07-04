import { useState } from "react";
import { classify } from "../lib/classification";
import { PreviewBox } from "../components/PreviewBox";
import { Spinner } from "../components/Spinner";
import { CameraInput } from "../components/CameraInput";
import { BouncingArrow } from "../components/BouncingArrow";
import { Popup } from "../components/Popup";
import { getReferenceImage } from "../lib/utils";

function Translate() {
  const [classificationResults, setClassificationResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [popupActive, setPopupActive] = useState(false);
  const [referenceImage, setReferenceImage] = useState(null);
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
          {
            id: classificationResult.id,
            label: classificationResult.classification,
          },
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
          <PreviewBox
            onItemClick={(item) => {
              setReferenceImage(getReferenceImage(item.label));
              setPopupActive(true);
            }}
            items={classificationResults}
          />
        )}
        {error && <p className="text-red-500 font-bold">{error}</p>}
        <Spinner active={isLoading} />
        <Popup active={popupActive}>
          <img className="mx-auto" src={referenceImage} alt="Sign language" />
          <div className="space-x-2">
            <button
              className="bg-blue-500 px-4 py-2 rounded"
              onClick={() => {
                setPopupActive(false);
              }}
            >
              Back
            </button>
            <button className="bg-red-500 px-4 py-2 rounded">Delete</button>
          </div>
        </Popup>
      </div>
    </>
  );
}

export { Translate };
