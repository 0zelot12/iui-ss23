import { useState } from "react";

import styled from "styled-components";

function Gallery() {
  const [refLetter, setrefLetter] = useState(null);
  const [sign, setSign] = useState(null);

  const alphabetData = [
    { letter: "A", signImage: "./ref_pics/A.png" },
    { letter: "B", signImage: "./ref_pics/B.png" },
  ];

  const handleButtonClick = (letter, signImage) => {
    setrefLetter(letter);
    setSign(signImage);
  };

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
    width: 50px;
    height: 50px;
    margin: 5px;
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
    width: 50px;
    height: 50px;
    object-fit: scale-down;
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
              onClick={() => handleButtonClick(data.letter, data.signImage)}
            >
              {data.letter}
            </Button>
          ))}
        </TableContainer>
        <Letter>{refLetter}</Letter>
        <Image src={sign} />
      </h1>

      <ButtonLink href="../Training"> &lt; Back </ButtonLink>
    </>
  );
}

export { Gallery };
