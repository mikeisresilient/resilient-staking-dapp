import React from 'react';
import './App.css';
import Navbar from './Navbar';
import Main from './Main';
import ParticleSettings from './ParticleSettings';
import { useBlockchain } from '../contexts/BlockchainContext';
import LoadingOverlay from "./LoadingOverlay";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { account, loading, transactionLoading, tetherBalance, rwdBalance, stakingBalance, stakeTokens, unstakeTokens, transactionStatus } = useBlockchain();

  let content;
  if (loading) {
    content = <p id='loader' role="status" aria-live="polite" className='text-center' style={{ margin: '30px', color: 'white' }}><b>LOADING PLEASE...</b></p>;
  } else {
    content = (
      <Main
        tetherBalance={tetherBalance}
        rwdBalance={rwdBalance}
        stakingBalance={stakingBalance}
        stakeTokens={stakeTokens}
        unstakeTokens={unstakeTokens}
        transactionStatus={transactionStatus}
      />
    );
  }

  return (
    <div className='App' style={{ position: 'relative' }}>
      <LoadingOverlay
        show={transactionLoading}
        message={transactionStatus}
      />
      <div style={{ position: 'absolute' }}>
        <ParticleSettings />
      </div>
      <Navbar account={account} />
      <div className='container-fluid mt-5'>
        <div className='row'>
          <main role='main' className='col-lg-12 ml-auto mr-auto' style={{ maxWidth: '1100px', minHeight: '100vh' }}>
            <div>
              {content}
            </div>
          </main>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
