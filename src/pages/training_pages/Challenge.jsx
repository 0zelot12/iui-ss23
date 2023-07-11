import { useState } from "react";
import { classify } from "../../libs/classification";
import { PreviewBox } from "../../components/PreviewBox";
import { Spinner } from "../../components/Spinner";
import { CameraInput } from "../../components/CameraInput";
import { BouncingArrow } from "../../components/BouncingArrow";
import { Popup } from "../../components/Popup";
import { getReferenceImage } from "../../libs/utils";
import styled from "styled-components";

function Challenge() {
  //get only one result at a time.
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [popupActive, setPopupActive] = useState(false);
  const [referenceImage, setReferenceImage] = useState(null);
  const [error, setError] = useState(null);

  // To generate a random letter
  const getRandomLetter = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    return alphabet[randomIndex];
  };
  const [randomLetter, setRandomLetter] = useState(getRandomLetter());

  const handleCaptureFrame = async (frame) => {
    setIsLoading(true);
    try {
      const classificationResult = await classify(frame);
      if (classificationResult.error === "NO_LANDMARKS") {
        setError("No hand detected, please try again.");
      } else {
        if (classificationResult.classification == randomLetter) {
          const newRandomLetter = getRandomLetter();
          setRandomLetter(newRandomLetter);
          setResult("You got it right! Now try another.");
          setError(null);
        } else {
          setResult("That's incorrect. Try again.");
        }
      }
    } catch (error) {
      setError(`An unexpected error occured: ${error.message}`);
    }
    setIsLoading(false);
  };

  // Styles
  const Title = styled.h1`
    text-align: center;
    font-size: 40px;
    font-weight: bold;
    color: dodgerblue;
  `;

  const Tagline = styled.h2`
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    color: dodgerblue;
  `;

  const Letter = styled.div`
    text-align: center;
    font-size: 70px;
    font-weight: bold;
    color: dodgerblue;
  `;

  const ButtonLink = styled.a`
    display: block;
    text-align: center;
    float: left;
    font-size: 30px;
    font-weight: bold;
    color: dodgerblue;
  `;

  return (
    <>
      <Title>Challenge Mode</Title>
      <Tagline>Sign the characters as they appear on-screen!</Tagline>
      <Letter>{randomLetter}</Letter>

      <CameraInput
        facingMode="environment"
        disabled={isLoading}
        onCaptureFrame={handleCaptureFrame}
      />
      <div className="container p-2 space-y-2 mx-auto flex flex-col items-center">
        {result ?? (
          <>
            <BouncingArrow />
            <p className="text-blue-950 text-xl text-center">
              Tap to capture an image.
            </p>
          </>
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

      <ButtonLink href="../Training"> &lt; Back </ButtonLink>
    </>
  );
}

export { Challenge };
