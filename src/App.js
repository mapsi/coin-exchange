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

    this.handleRefresh = this.handleRefresh.bind(this);
  }
  handleRefresh(valueChangeTicker) {
    const newCoinData = this.state.coinData.map(({ ticker, name, price }) => {
      let newPrice = price;
      if (valueChangeTicker === ticker) {
        const randomPercentage = 0.995 + Math.random() * 0.01;

        newPrice = newPrice * randomPercentage;
      }
      return {
        ticker,
        name,
        price: newPrice,
      };
    });

    this.setState({
      coinData: newCoinData,
    });
  }
  render() {
    return (
      <AppDiv>
        <ExchangeHeader />
        <AccountBalance amount={10000} />
        <CoinList
          coinData={this.state.coinData}
          handleRefresh={this.handleRefresh}
        />
      </AppDiv>
    );
  }
}

export default App;
