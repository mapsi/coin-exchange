import AccountBalance from "./components/AccountBalance/AccountBalance";

import { useEffect, useState } from "react";
import CoinList from "./components/CoinList/CoinList";
import ExchangeHeader from "./components/ExchangeHeader/ExchangeHeader";
import styled from "styled-components";
import axios from "axios";
import 'bootswatch/dist/flatly/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/all'

const AppDiv = styled.div`
  text-align: center;
  background-color: rgb(13, 13, 94);
  color: #cccc;
`;

const COIN_COUNT = 5;

function App(props) {
  const [balance, setBalance] = useState(10000);
  const [showBalance, setShowBalance] = useState(false);
  const [coinData, setCoinData] = useState([]);

  const fetchData = async () => {
    const { data } = await axios.get("https://api.coinpaprika.com/v1/coins");
    const coinList = data.slice(0, COIN_COUNT).map((coin) => coin.id);
    const coinData = await getTickerData(coinList);
    setCoinData(coinData);
  };

  useEffect(() => {
    if (coinData.length === 0) {
      fetchData();
    }
  });

  const handleBrrrr = () => {
    setBalance(balance + 2000);
  }


  const getTickerData = async (coinList) => {
    const promises = coinList.map((coin) => {
      return axios.get(`https://api.coinpaprika.com/v1/tickers/${coin}`);
    });
    const tickers = await Promise.all(promises);

    return tickers.map(({ data: ticker }) => {
      return {
        key: ticker.id,
        name: ticker.name,
        ticker: ticker.symbol,
        price: parseFloat(ticker.quotes.USD.price),
        balance: 0,
      };
    });
  };

  const handleTransaction = (isBuy, coin) => {
    const balanceChange = isBuy ? 1 : -1;
    const newCoinData = coinData.map(values => {
      const newValues = { ...values };
      if (coin === values.key) {
        newValues.balance += balanceChange;
        setBalance(balance - balanceChange * newValues.price);
      }
      return newValues;
    })

    setCoinData(newCoinData);
  }

  const handleRefresh = async (valueChangeTicker) => {
    const tickerData = await getTickerData([valueChangeTicker]);

    const coinIndex = coinData.findIndex(
      (coin) => coin.key === valueChangeTicker
    );
    if (coinIndex !== -1) {
      const newCoinData = { ...coinData };
      newCoinData[coinIndex].price = tickerData[0].price;
      setCoinData(newCoinData);
    }
  };

  const handleToggleBalance = () => {
    setShowBalance(!showBalance);
  };

  return (
    <AppDiv>
      <ExchangeHeader />
      <AccountBalance
        amount={balance}
        showBalance={showBalance}
        handleToggleBalance={handleToggleBalance}
        handleBrrrr={handleBrrrr}
      />
      <CoinList
        coinData={coinData}
        showBalance={showBalance}
        handleTransaction={handleTransaction}
        handleRefresh={handleRefresh}
      />
    </AppDiv>
  );
}

export default App;
