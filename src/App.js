import logo from './logo.svg';
import './App.css';
import AccountBalance from './components/AccountBalance/AccountBalance.jsx';

import Coin from './components/Coin/Coin';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className='App-title'>Coin Exchange</h1>
      </header>
      <AccountBalance amount={10000} />
      <table className='coin-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Ticket</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <Coin name="Bitcoin" ticker="BTC" price={30000} />
          <Coin name="Ethereum" ticker="ETH" price={3000} />
          <Coin name="Tether" ticker="USDT" price={30} />
        </tbody>
      </table>
    </div>
  );
}

export default App;
