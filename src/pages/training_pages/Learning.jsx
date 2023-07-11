import { useState } from "react";
import { classify } from "../../libs/classification";
import { PreviewBox } from "../../components/PreviewBox";
import { Spinner } from "../../components/Spinner";
import { CameraInput } from "../../components/CameraInput";
import { BouncingArrow } from "../../components/BouncingArrow";
import { Popup } from "../../components/Popup";
import { getReferenceImage } from "../../libs/utils";

import styled from "styled-components";
import imgs from "./Images";

function Learning() {
  //get only one result at a time.
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [popupActive, setPopupActive] = useState(false);
  const [referenceImage, setReferenceImage] = useState(null);
  const [error, setError] = useState(null);

  const [refLetter, setrefLetter] = useState(null);

  const alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  const alphabetData = alphabet.map((letter, index) => ({
    letter: letter,
    //signImage: "./ref_pics/${letter}.png",
    //signImage: images[`${letter}.png`],
    signImage: imgs[index],
  }));

  const handleButtonClick = (letter) => {
    setrefLetter(letter);
    //setSign(signImage);
  };

  const selectedData = alphabetData.find((data) => data.letter === refLetter);

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

  const TableContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    max_width: 500px;
    margin: 0 auto;
  `;

  const Button = styled.button`
    display: block;
    text-align: center;
    width: 50px;
    height: 50px;
    margin: 5px;
    font-weight: bold;
    background-color: dodgerblue;
    border: none;
    border-radius: 4px;
    color: white;
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

  const Image = styled.img`
    display: block;
    max-width: 100%;
    height: auto;
    margin-left: auto;
    margin-right: auto;
    transform: scale(1);
  `;

  // dont forget ref letter
  return (
    <>
      <Title>Sign Training</Title>
      <Tagline>Currently:</Tagline>
      <h1>
        <TableContainer>
          {alphabetData.map((data) => (
            <Button
              key={data.letter}
              onClick={() => handleButtonClick(data.letter)}
            >
              {data.letter}
            </Button>
          ))}
        </TableContainer>
        <div>
          {selectedData && (
            <div>
              <Letter>{refLetter}</Letter>
              <Image src={selectedData.signImage} />
            </div>
          )}
        </div>
      </h1>

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
