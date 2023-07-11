import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: stretch;
  height: 100vh;
`;

const LinkButton = styled.a`
  //flex: 1;
  height: 200px;
  background-color: dodgerblue;
  border: none;
  border-radius: 4px;
  color: white;
  //padding: 16px 32px;
  text-align: center;
  font-size: 40px;
  font-weight: bold;
  filter: drop-shadow(5px 8px 1px rgba(0, 0, 0, 0.25));

  display: flex;
  align-items: center;
  justify-content: center; //instead of flex-end
  margin: 0 8px;
  margin-bottom: 16px;
`;

function Training() {
  return (
    <Container>
      <LinkButton href="/learning">Learning Mode</LinkButton>
      <LinkButton href="/challenge">Challenge Mode</LinkButton>
      <LinkButton href="/gallery">Gallery</LinkButton>
    </Container>
  );
}

export { Training };
