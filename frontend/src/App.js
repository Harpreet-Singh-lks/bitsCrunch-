import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UploadPage from './pages/uploadPage'; // Ensure this path is correct

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [welcomeMessage, setWelcomeMessage] = useState('');

  useEffect(() => {
    const fetchWelcomeMessage = async () => {
      try {
        const response = await fetch('/home');
        const data = await response.json();
        setWelcomeMessage(data.message);
      } catch (error) {
        console.error('Error fetching welcome message:', error);
      }
    };

    fetchWelcomeMessage();
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const address = addressArray[0];
        setWalletAddress(address);
        console.log('Connected address:', address);
      } catch (error) {
        console.error('Error connecting to wallet:', error);
      }
    } else {
      console.error('Ethereum object not found');
    }
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>{welcomeMessage}</h1>
          {walletAddress ? (
            <div>
              <p>Wallet connected successfully!</p>
              <p>Address: {walletAddress}</p>
              <Link to="/upload">
                <button className="App-button">
                  Next Page
                </button>
              </Link>
            </div>
          ) : (
            <button onClick={connectWallet} className="App-button">
              Connect Wallet
            </button>
          )}
        </header>
      </div>
      <Routes>
        <Route path="/upload" element={<UploadPage walletAddress={walletAddress} />} />
      </Routes>
    </Router>
  );
}

export default App;