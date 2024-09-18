import { useContext } from "react";
import { ethers } from "ethers";
import { WalletContext } from "./providers/WalletProvider";

function Transfer() {
  const { provider } = useContext(WalletContext);

  const sender = "0x5f0Bbcb7CFd57dB262799640B731872922F59C79";
  const receiver = "0xC829e66e2fD674A101926B57873564AC9Ff1F79e";

  const privateKey =
    "4ae4abcbe834738d1c5ad208b159d0fd57002ccb4535cecb95c89193550b1311";

  const wallet = new ethers.Wallet(privateKey, provider);

  const sendTransaction = async () => {
    const sbb = await provider.getBalance(sender);
    console.log("sender balance: ", ethers.utils.formatEther(sbb));
    const rbb = await provider.getBalance(receiver);
    console.log("receiver balance: ", ethers.utils.formatEther(rbb));

    const tx = await wallet.sendTransaction({
      to: receiver,
      value: ethers.utils.parseEther("0.025"),
    });
    console.log("transaction: ", tx);
    tx.wait();
    console.log("transaction mined: ", tx);

    const sba = await provider.getBalance(sender);
    console.log("sender balance: ", ethers.utils.formatEther(sba));
    const rba = await provider.getBalance(receiver);
    console.log("receiver balance: ", ethers.utils.formatEther(rba));
  };

  return (
    <div>
      <button onClick={sendTransaction}>Transfer</button>
    </div>
  );
}

export default Transfer;
