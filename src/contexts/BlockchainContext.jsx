import React, { createContext, useContext, useState, useEffect } from 'react';
import Web3 from 'web3';
import Tether from "../truffle_abis/Tether.json";
import RWD from "../truffle_abis/RWD.json";
import DecentralBank from "../truffle_abis/DecentralBank.json";
import { toast } from "react-toastify";

const BlockchainContext = createContext();

export const useBlockchain = () => {
  return useContext(BlockchainContext);
};

export const BlockchainProvider = ({ children }) => {
  const [account, setAccount] = useState('0x0');
  const [tether, setTether] = useState({});
  const [rwd, setRwd] = useState({});
  const [decentralBank, setDecentralBank] = useState({});
  const [tetherBalance, setTetherBalance] = useState('0');
  const [rwdBalance, setRwdBalance] = useState('0');
  const [stakingBalance, setStakingBalance] = useState('0');
  const [loading, setLoading] = useState(true);
  const [transactionLoading, setTransactionLoading] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState('');

  useEffect(() => {
    const load = async () => {
      await loadWeb3();
      await loadBlockchainData();
    };
    load();
  }, []);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.request({
        method: "eth_requestAccounts",
      });
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert('No ethereum browser detected! You can check out MetaMask!');
    }
  };

  const loadBlockchainData = async () => {
    try {
      const web3 = window.web3;

      const accounts = await web3.eth.getAccounts();

      if (!accounts.length) {
        throw new Error("No MetaMask account connected.");
      }

      setAccount(accounts[0]);

      const networkId = await web3.eth.net.getId();

      console.log("Network:", networkId);

      // Tether
      const tetherData = Tether.networks[networkId];

      if (!tetherData)
        throw new Error("Tether contract not deployed.");

      const tetherContract = new web3.eth.Contract(
        Tether.abi,
        tetherData.address
      );

      setTether(tetherContract);

      const tetherBalance = await tetherContract.methods
        .balanceOf(accounts[0])
        .call();

      setTetherBalance(tetherBalance.toString());

      // RWD
      const rwdData = RWD.networks[networkId];

      if (!rwdData)
        throw new Error("RWD contract not deployed.");

      const rwdContract = new web3.eth.Contract(
        RWD.abi,
        rwdData.address
      );

      setRwd(rwdContract);

      const rwdBalance = await rwdContract.methods
        .balanceOf(accounts[0])
        .call();

      setRwdBalance(rwdBalance.toString());

      // Bank
      const bankData = DecentralBank.networks[networkId];

      if (!bankData)
        throw new Error("DecentralBank contract not deployed.");

      const bank = new web3.eth.Contract(
        DecentralBank.abi,
        bankData.address
      );

      setDecentralBank(bank);

      const stakingBalance = await bank.methods
        .stakingBalance(accounts[0])
        .call();

      setStakingBalance(stakingBalance.toString());

    } catch (err) {
      console.error(err);
      alert(err.message);

    } finally {
      setLoading(false);
    }
  };

  const stakeTokens = (amount) => {
    setTransactionLoading(true);
    setTransactionStatus("Waiting for approval...");
    tether.methods.approve(decentralBank.options.address, amount).send({ from: account }).on('transactionHash', () => {
      setTransactionStatus("Approval confirmed. Staking tokens...");
      decentralBank.methods.depositTokens(amount).send({ from: account })
        .on('receipt', (receipt) => {
          setTransactionLoading(false);
          toast.success("✅ Tokens staked successfully!");
          setTransactionStatus("Staking successful!");
          loadBlockchainData();
        })
        .on('error', (error) => {
          setTransactionLoading(false);
          toast.error("❌ Staking failed.");
          setTransactionStatus("Staking failed.");
        });
    })
      .on('error', (error) => {
        setTransactionLoading(false);
        toast.error("❌ Approval rejected.");
        setTransactionStatus("Approval failed.");
      });
  };

  const unstakeTokens = () => {
    setTransactionLoading(true);
    setTransactionStatus('');
    decentralBank.methods.unstakeTokens().send({ from: account })
      .on('receipt', (receipt) => {
        setTransactionLoading(false);
        toast.success("🎉 Tokens unstaked successfully!");
        setTransactionStatus("Unstaking successful!");
        loadBlockchainData();
      })
      .on('error', (error) => {
        setLoading(false);
        toast.error("❌ Unstaking failed.");
        setTransactionStatus("Unstaking failed.");
      });
  };

  const value = {
    account,
    tether,
    rwd,
    decentralBank,
    tetherBalance,
    rwdBalance,
    stakingBalance,
    loading,
    transactionLoading,
    transactionStatus,
    stakeTokens,
    unstakeTokens,
  };

  return (
    <BlockchainContext.Provider value={value}>
      {children}
    </BlockchainContext.Provider>
  );
};
