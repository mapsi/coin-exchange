import AccountBalance from "./components/AccountBalance/AccountBalance";

import React from "react";
import CoinList from "./components/CoinList/CoinList";
import ExchangeHeader from "./components/ExchangeHeader/ExchangeHeader";
import styled from "styled-components";
import axios from "axios";

const AppDiv = styled.div`
  text-align: center;
  background-color: rgb(13, 13, 94);
  color: #cccc;
`;

const COIN_COUNT = 5;

class App extends React.Component {
  state = {
    showBalance: true,
    balance: 10000,
    coinData: [],
  };

  componentDidMount = async () => {
    const { data } = await axios.get("https://api.coinpaprika.com/v1/coins");

    const coinList = data.slice(0, COIN_COUNT).map((coin) => coin.id);

    const coinData = await this.getTickerData(coinList);

    this.setState({ coinData });
  };

  getTickerData = async (coinList) => {
    const promises = coinList.map((coin) => {
      return axios.get(`https://api.coinpaprika.com/v1/tickers/${coin}`);
    });
    const tickers = await Promise.all(promises);

    return tickers.map(({ data: ticker }) => {
      return {
        key: ticker.id,
        name: ticker.name,
        ticker: ticker.symbol,
        price: parseFloat(Number(ticker.quotes.USD.price)).toFixed(4),
        balance: 0,
      };
    });
  };

  handleRefresh = async (valueChangeTicker) => {
    const tickerData = await this.getTickerData([valueChangeTicker]);

    const coinIndex = this.state.coinData.findIndex(
      (coin) => coin.key === valueChangeTicker
    );
    if (coinIndex !== -1) {
      const { coinData } = { ...this.state };
      coinData[coinIndex].price = tickerData[0].price;
      this.setState({ coinData });
    }
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
