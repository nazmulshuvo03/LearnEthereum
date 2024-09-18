import React, { createContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import ABI from "../../abi.json";

const WalletContext = createContext();
const address = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const abi = ABI;

const WalletProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log("web3 provider: ", web3Provider);

    const rpcProvider = new ethers.providers.JsonRpcProvider(window.ethereum);
    console.log("json rpc provider: ", rpcProvider);

    setProvider(web3Provider);
  }, []);

  async function getWalletAccess() {
    const network = await provider.getNetwork();
    console.log("network: ", network);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    console.log("signer: ", signer);
    const ethContract = new ethers.Contract(address, abi, signer);
    console.log("contract: ", ethContract);
    setContract(ethContract);
  }

  const value = {
    provider,
    contract,
    getWalletAccess,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};

export { WalletProvider, WalletContext };
