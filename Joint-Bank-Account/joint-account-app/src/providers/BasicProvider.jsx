import React, { createContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import { INFURA_ID } from "../../config";
import ABI from "../../abi.json";

const WalletContext = createContext();
const address = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const abi = ABI;

const WalletProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const networks = ["mainnet", "goerli", "sepolia"];
    const ethProvider = new ethers.providers.JsonRpcProvider(
      `https://${networks[2]}.infura.io/v3/${INFURA_ID}`
    );
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log("provider: ", ethProvider);

    const ethContract = new ethers.Contract(address, abi, ethProvider);

    setProvider(ethProvider);
    setContract(ethContract);
  }, []);

  const value = {
    provider,
    contract,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};

export { WalletProvider, WalletContext };
