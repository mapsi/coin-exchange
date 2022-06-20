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
  state = {
    showBalance: true,
    balance: 10000,
    coinData: [
      { name: "Bitcoin", ticker: "BTC", price: 9999.9, balance: 1 },
      { name: "Ethereum", ticker: "ETH", price: 299.99, balance: 2 },
      { name: "Tether", ticker: "USDT", price: 1.0, balance: 3 },
    ],
  };

  handleRefresh = (valueChangeTicker) => {
    const newCoinData = this.state.coinData.map((values) => {
      let newValues = { ...values };
      if (valueChangeTicker === newValues.ticker) {
        const randomPercentage = 0.995 + Math.random() * 0.01;

        newValues.price = values.price * randomPercentage;
      }
      return newValues;
    });

    this.setState({
      coinData: newCoinData,
    });
  };

  handleToggleBalance = () => {
    const { showBalance } = this.state;

    this.setState({
      showBalance: !showBalance,
    });
  };

  render() {
    return (
      <AppDiv>
        <ExchangeHeader />
        <AccountBalance
          amount={10000}
          showBalance={this.state.showBalance}
          handleToggleBalance={this.handleToggleBalance}
        />
        <CoinList
          coinData={this.state.coinData}
          showBalance={this.state.showBalance}
          handleRefresh={this.handleRefresh}
        />
      </AppDiv>
    );
  }
}

export default App;
