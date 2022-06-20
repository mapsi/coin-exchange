import styled from "styled-components";
import Coin from "../Coin/Coin";

const Table = styled.table`
  margin: 50px auto 50px auto;
  display: inline-block;
  font-size: 1.4rem;
`;

export default function CoinList(props) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Ticket</th>
          <th>Price</th>
          <th>Balance</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.coinData.map(({ key, ticker, name, price, balance }) => (
          <Coin
            key={ticker}
            name={name}
            ticker={ticker}
            price={price}
            balance={balance}
            showBalance={props.showBalance}
            handleRefresh={props.handleRefresh}
            coinId={key}
          />
        ))}
      </tbody>
    </Table>
  );
}
