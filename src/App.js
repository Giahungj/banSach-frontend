import logo from './logo.svg';
import './App.css';
// import Menu from './containers/Item.js';
import Hello from './demo/Hello';
import Car from './demo/Car';
import Login from './demo/Login';
// import Information from './containers/Information.js';
import AddProduct from './demo/Add.js';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {/* <Menu /> */}
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Hello/>
        <Car/>
        {/* <Information/> */}
        <div className="Login">
          <Login/>
        </div>
        <AddProduct />
      </header>
    </div>
  );
}

export default App;
