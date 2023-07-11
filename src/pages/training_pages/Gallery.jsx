import { useState } from "react";

import styled from "styled-components";
import imgs from "./Images";

function Gallery() {
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

  // Styles
  const Title = styled.h1`
    text-align: center;
    font-size: 40px;
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
      <Title>Gallery</Title>
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
      <ButtonLink href="../Training"> &lt; Back </ButtonLink>
    </>
  );
}

export { Gallery };
