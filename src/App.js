
import AccountBalance from "./components/AccountBalance/AccountBalance";

import React from "react";
import CoinList from "./components/CoinList/CoinList";
import ExchangeHeader from "./components/ExchangeHeader/ExchangeHeader";
import styled from "styled-components";

const AppDiv = styled.div`
text-align: center;
background-color: rgb(13, 13, 94);
color: #cccc;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: 10000,
      coinData: [
        { name: "Bitcoin", ticker: "BTC", price: 9999.9 },
        { name: "Ethereum", ticker: "ETH", price: 299.99 },
        { name: "Tether", ticker: "USDT", price: 1.0 },
      ],
    };
  }
  render() {
    return (
      <AppDiv>
        <ExchangeHeader />
        <AccountBalance amount={10000} />
        <CoinList coinData={this.state.coinData} />
      </AppDiv>
    );
  }
}

export default App;
