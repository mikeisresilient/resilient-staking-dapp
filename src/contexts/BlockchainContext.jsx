import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import Web3 from "web3";

import Tether from "../truffle_abis/Tether.json";
import RWD from "../truffle_abis/RWD.json";
import DecentralBank from "../truffle_abis/DecentralBank.json";

import { toast } from "react-toastify";

const BlockchainContext = createContext();

export const useBlockchain = () => {
  return useContext(BlockchainContext);
};

export const BlockchainProvider = ({ children }) => {

  /* =========================================
     WALLET STATE
     ========================================= */

  const [account, setAccount] = useState(null);

  const [networkId, setNetworkId] = useState(null);

  const [isWalletConnected, setIsWalletConnected] = useState(false);


  /* =========================================
     CONTRACT STATE
     ========================================= */

  const [tether, setTether] = useState({});
  const [rwd, setRwd] = useState({});
  const [decentralBank, setDecentralBank] = useState({});


  /* =========================================
     BALANCES
     ========================================= */

  const [tetherBalance, setTetherBalance] = useState("0");
  const [rwdBalance, setRwdBalance] = useState("0");
  const [stakingBalance, setStakingBalance] = useState("0");


  /* =========================================
     UI STATE
     ========================================= */

  const [loading, setLoading] = useState(true);

  const [transactionLoading, setTransactionLoading] =
    useState(false);

  const [transactionStatus, setTransactionStatus] =
    useState("");


  /* =========================================
     INITIALIZE WEB3
     ========================================= */

  useEffect(() => {

    const initialize = async () => {

      if (!window.ethereum) {
        console.warn("MetaMask not detected.");
        setLoading(false);
        return;
      }

      window.web3 = new Web3(window.ethereum);

      try {

        /*
         * Check whether MetaMask is already connected.
         *
         * IMPORTANT:
         * We do NOT call eth_requestAccounts here.
         * That prevents the DApp from automatically
         * requesting wallet access on page load.
         */

        const accounts =
          await window.ethereum.request({
            method: "eth_accounts",
          });

        if (accounts.length > 0) {

          setAccount(accounts[0]);
          setIsWalletConnected(true);

          await loadBlockchainData(accounts[0]);

        } else {

          setAccount(null);
          setIsWalletConnected(false);

          setLoading(false);
        }

      } catch (error) {

        console.error(
          "Wallet initialization failed:",
          error
        );

        setAccount(null);
        setIsWalletConnected(false);

        setLoading(false);
      }
    };


    initialize();


    /* =========================================
       ACCOUNT CHANGE
       ========================================= */

    const handleAccountsChanged = async (accounts) => {

      if (!accounts || accounts.length === 0) {

        /*
         * User disconnected the account from MetaMask
         * or removed the account connection.
         */

        setAccount(null);
        setIsWalletConnected(false);

        clearBlockchainData();

        return;
      }

      const newAccount = accounts[0];

      setAccount(newAccount);
      setIsWalletConnected(true);

      await loadBlockchainData(newAccount);
    };


    /* =========================================
       NETWORK CHANGE
       ========================================= */

    const handleChainChanged = async () => {

      /*
       * Reloading is the safest way to ensure
       * all contract instances and balances use
       * the new network.
       */

      window.location.reload();
    };


    window.ethereum?.on(
      "accountsChanged",
      handleAccountsChanged
    );

    window.ethereum?.on(
      "chainChanged",
      handleChainChanged
    );


    /* =========================================
       CLEANUP
       ========================================= */

    return () => {

      window.ethereum?.removeListener(
        "accountsChanged",
        handleAccountsChanged
      );

      window.ethereum?.removeListener(
        "chainChanged",
        handleChainChanged
      );
    };

  }, []);


  /* =========================================
     CONNECT WALLET
     ========================================= */

  const connectWallet = async () => {

    if (!window.ethereum) {

      toast.error(
        "MetaMask is not installed."
      );

      return;
    }

    try {

      window.web3 = new Web3(
        window.ethereum
      );

      const accounts =
        await window.ethereum.request({
          method: "eth_requestAccounts",
        });

      if (!accounts.length) {

        setAccount(null);
        setIsWalletConnected(false);

        return;
      }

      const connectedAccount =
        accounts[0];

      setAccount(connectedAccount);
      setIsWalletConnected(true);

      await loadBlockchainData(
        connectedAccount
      );

    } catch (error) {

      console.error(
        "Wallet connection failed:",
        error
      );

      setAccount(null);
      setIsWalletConnected(false);

      toast.error(
        "Wallet connection was rejected."
      );

      setLoading(false);
    }
  };


  /* =========================================
     DISCONNECT WALLET
     ========================================= */

  const disconnectWallet = () => {

    /*
     * A website cannot revoke MetaMask's permission
     * directly.
     *
     * We disconnect the DApp's active wallet state.
     */

    setAccount(null);

    setIsWalletConnected(false);

    clearBlockchainData();

    setTransactionStatus("");

    toast.info(
      "Wallet disconnected from the DApp."
    );
  };


  /* =========================================
     CLEAR BLOCKCHAIN DATA
     ========================================= */

  const clearBlockchainData = () => {

    setTether({});
    setRwd({});
    setDecentralBank({});

    setTetherBalance("0");
    setRwdBalance("0");
    setStakingBalance("0");

    setTransactionLoading(false);
    setTransactionStatus("");
  };


  /* =========================================
     LOAD BLOCKCHAIN DATA
     ========================================= */

  const loadBlockchainData = async (
    selectedAccount = account
  ) => {

    try {

      if (!window.web3) {

        window.web3 = new Web3(
          window.ethereum
        );
      }

      const web3 = window.web3;


      /* =========================================
         CHECK ACCOUNT
         ========================================= */

      if (!selectedAccount) {

        setAccount(null);
        setIsWalletConnected(false);

        clearBlockchainData();

        setLoading(false);

        return;
      }


      setAccount(selectedAccount);
      setIsWalletConnected(true);


      /* =========================================
         NETWORK
         ========================================= */

      const currentNetworkId =
        Number(
          await web3.eth.net.getId()
        );

      setNetworkId(currentNetworkId);


      /* =========================================
         SEPOLIA CHECK
         ========================================= */

      if (currentNetworkId !== 11155111) {

        setTether({});
        setRwd({});
        setDecentralBank({});

        setTetherBalance("0");
        setRwdBalance("0");
        setStakingBalance("0");

        setLoading(false);

        toast.warning(
          "Please switch MetaMask to the Sepolia Test Network."
        );

        return;
      }


      /* =========================================
         TETHER
         ========================================= */

      const tetherData =
        Tether.networks[currentNetworkId];

      if (!tetherData) {

        throw new Error(
          "Tether contract not deployed."
        );
      }

      const tetherContract =
        new web3.eth.Contract(
          Tether.abi,
          tetherData.address
        );

      setTether(tetherContract);


      const tetherBalance =
        await tetherContract.methods
          .balanceOf(selectedAccount)
          .call();

      setTetherBalance(
        tetherBalance.toString()
      );


      /* =========================================
         RWD
         ========================================= */

      const rwdData =
        RWD.networks[currentNetworkId];

      if (!rwdData) {

        throw new Error(
          "RWD contract not deployed."
        );
      }

      const rwdContract =
        new web3.eth.Contract(
          RWD.abi,
          rwdData.address
        );

      setRwd(rwdContract);


      const rwdBalance =
        await rwdContract.methods
          .balanceOf(selectedAccount)
          .call();

      setRwdBalance(
        rwdBalance.toString()
      );


      /* =========================================
         DECENTRAL BANK
         ========================================= */

      const bankData =
        DecentralBank.networks[
          currentNetworkId
        ];

      if (!bankData) {

        throw new Error(
          "DecentralBank contract not deployed."
        );
      }

      const bank =
        new web3.eth.Contract(
          DecentralBank.abi,
          bankData.address
        );

      setDecentralBank(bank);


      const stakingBalance =
        await bank.methods
          .stakingBalance(selectedAccount)
          .call();

      setStakingBalance(
        stakingBalance.toString()
      );

    } catch (err) {

      console.error(err);

      setAccount(null);
      setIsWalletConnected(false);

      toast.error(
        err.message || "Unable to load blockchain data."
      );

    } finally {

      setLoading(false);
    }
  };


  /* =========================================
     STAKE TOKENS
     ========================================= */

  const stakeTokens = (amount) => {

    if (!account) {

      toast.error(
        "Please connect your wallet first."
      );

      return;
    }

    setTransactionLoading(true);

    setTransactionStatus(
      "Waiting for approval..."
    );

    tether.methods
      .approve(
        decentralBank.options.address,
        amount
      )
      .send({
        from: account,
      })

      .on("transactionHash", () => {

        setTransactionStatus(
          "Approval confirmed. Staking tokens..."
        );

        decentralBank.methods
          .depositTokens(amount)
          .send({
            from: account,
          })

          .on("receipt", () => {

            setTransactionLoading(false);

            toast.success(
              "✅ Tokens staked successfully!"
            );

            setTransactionStatus(
              "Staking successful!"
            );

            loadBlockchainData(account);
          })

          .on("error", () => {

            setTransactionLoading(false);

            toast.error(
              "❌ Staking failed."
            );

            setTransactionStatus(
              "Staking failed."
            );
          });
      })

      .on("error", () => {

        setTransactionLoading(false);

        toast.error(
          "❌ Approval rejected."
        );

        setTransactionStatus(
          "Approval failed."
        );
      });
  };


  /* =========================================
     UNSTAKE TOKENS
     ========================================= */

  const unstakeTokens = () => {

    if (!account) {

      toast.error(
        "Please connect your wallet first."
      );

      return;
    }

    setTransactionLoading(true);

    setTransactionStatus("");

    decentralBank.methods
      .unstakeTokens()
      .send({
        from: account,
      })

      .on("receipt", () => {

        setTransactionLoading(false);

        toast.success(
          "🎉 Tokens unstaked successfully!"
        );

        setTransactionStatus(
          "Unstaking successful!"
        );

        loadBlockchainData(account);
      })

      .on("error", () => {

        setTransactionLoading(false);

        toast.error(
          "❌ Unstaking failed."
        );

        setTransactionStatus(
          "Unstaking failed."
        );
      });
  };


  /* =========================================
     CONTEXT VALUE
     ========================================= */

  const value = {

    account,

    networkId,

    isWalletConnected,

    connectWallet,

    disconnectWallet,

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
    <BlockchainContext.Provider
      value={value}
    >
      {children}
    </BlockchainContext.Provider>
  );
};