import { useEffect, useContext } from "react";
import { ethers } from "ethers";
import { WalletContext } from "./providers/WalletProvider";
import Transfer from "./Transfer";
import Navbar from "./components/Navbar";

function App() {
  const { provider, contract } = useContext(WalletContext);

  async function testFunctions() {
    const balance = await provider.getBalance(
      "0xc6e2459991BfE27cca6d86722F35da23A1E4Cb97"
    );
    console.log(`Balance: ${ethers.utils.formatEther(balance)} ETH`);

    const contractName = await contract.name();
    console.log("contractName: ", contractName);
  }

  useEffect(() => {
    if (provider && contract) {
      testFunctions();
    }
  }, [provider, contract]);

  return (
    <div>
      <Navbar />
      <h1>Landing Page</h1>
      <Transfer />
    </div>
  );
}

export default App;
