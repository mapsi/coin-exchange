import styled from "styled-components";
import Coin from "../Coin/Coin";

const Table = styled.table`
  font-size: 1.4rem;
`;

export default function CoinList(props) {
  return (
    <Table className="table table-primary table-bordered">
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
            handleTransaction={props.handleTransaction}
            handleRefresh={props.handleRefresh}
            coinId={key}
          />
        ))}
      </tbody>
    </Table>
  );
}
