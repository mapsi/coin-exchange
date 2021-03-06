import styled from "styled-components";
import logo from "./logo.svg";

const Header = styled.header`
  background-color: #282c34;
  min-height: 20vh;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-size: calc(10px + 3vmin);
  color: white;
`;

const Img = styled.img`
  height: 8rem;
  pointer-events: none;
`;

const H1 = styled.h1`
  font-size: 2rem;
  line-height: 8rem;
  font-weight: bold;
  min-width: 300px;
`;

export default function ExchangeHeader() {
  return (
    <Header>
      <Img src={logo} alt="logo" />
      <H1>Coin Exchange</H1>
    </Header>
  );
}
