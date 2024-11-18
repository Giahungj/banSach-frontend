// import logo from './logo.svg';
import './App.css';
import Menu from './components/header/Menu.js';
import { Outlet } from 'react-router-dom';
import Footer from './components/home/Footer.js'
function App() {
  return (
    <div className="App">
      <div className="App-header">
        <Menu/>
      </div>
      <div className="App-outlet"><Outlet /></div>
      <div className="App-footer"><Footer /></div>
    </div>
  );
}

export default App;
