import PropTypes from "prop-types";
import styled from "styled-components";

const Td = styled.td`
  border: 1px solid #cccccc;
  width: 25vh;
`;

export default function Coin(props) {
  const handleClick = (event) => {
    event.preventDefault();

    props.handleRefresh(props.coinId);
  };

  return (
    <tr>
      <Td>{props.name}</Td>
      <Td>{props.ticker}</Td>
      <Td>${props.price.toFixed(5)}</Td>
      <Td>{props.showBalance ? `${props.balance}` : "xxx"}</Td>
      <Td>
        <form action="#" method="POST">
          <button onClick={handleClick}>Refresh</button>
        </form>
      </Td>
    </tr>
  );
}

Coin.propTypes = {
  name: PropTypes.string.isRequired,
  ticker: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};
