import { useState } from "react";
import { classify } from "../../lib/classification";
import { PreviewBox } from "../../components/PreviewBox";
import { Spinner } from "../../components/Spinner";
import { CameraInput } from "../../components/CameraInput";
import { BouncingArrow } from "../../components/BouncingArrow";
import { Popup } from "../../components/Popup";
import { getReferenceImage } from "../../lib/utils";

import styled from "styled-components";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";

function Learning() {
  //get only one result at a time.
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [popupActive, setPopupActive] = useState(false);
  const [referenceImage, setReferenceImage] = useState(null);
  const [error, setError] = useState(null);

  const [refLetter, setrefLetter] = useState(null);

  const handleCaptureFrame = async (frame) => {
    setIsLoading(true);
    try {
      const classificationResult = await classify(frame);
      if (classificationResult.error === "NO_LANDMARKS") {
        setError("No hand detected, please try again.");
      } else {
        if (classificationResult.classification == refLetter) {
          setResult("You got it right!");
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

  const ArrowButton = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 24px;
    background-color: transparent;
    border: none;
    outline: none;
  `;

  const PreviousButton = styled(ArrowButton)`
    left: 20px;
  `;

  const NextButton = styled(ArrowButton)`
    right: 20px;
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

  // dont forget ref letter
  return (
    <>
      <Title>Sign Training</Title>
      <Tagline>Currently:</Tagline>
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        totalSlides={26}
      >
        <Slider>
          <Slide index={0}>first</Slide>
          <Slide index={1}>second</Slide>
          <Slide index={2}>first</Slide>
          <Slide index={3}>first</Slide>
          <Slide index={4}>first</Slide>

          <Slide index={5}>first</Slide>
          <Slide index={6}>first</Slide>
          <Slide index={7}>first</Slide>
          <Slide index={8}>first</Slide>
          <Slide index={9}>first</Slide>

          <Slide index={10}>first</Slide>
          <Slide index={11}>first</Slide>
          <Slide index={12}>first</Slide>
          <Slide index={13}>first</Slide>
          <Slide index={14}>first</Slide>

          <Slide index={15}>first</Slide>
          <Slide index={16}>first</Slide>
          <Slide index={17}>first</Slide>
          <Slide index={18}>first</Slide>
          <Slide index={19}>first</Slide>

          <Slide index={20}>first</Slide>
          <Slide index={21}>first</Slide>
          <Slide index={22}>first</Slide>
          <Slide index={23}>first</Slide>
          <Slide index={24}>first</Slide>
          <Slide index={25}>last</Slide>
        </Slider>
        <ButtonBack>Back</ButtonBack>
        <ButtonNext>Next</ButtonNext>
      </CarouselProvider>

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

export { Learning };
