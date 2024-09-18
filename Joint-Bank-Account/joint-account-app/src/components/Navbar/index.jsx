import { useEffect, useContext } from "react";
import { WalletContext } from "../../providers/WalletProvider";

export default function Navbar() {
  const { getWalletAccess } = useContext(WalletContext);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          fontSize: "30px",
          fontWeight: "bold",
        }}
      >
        Joint Account App
      </div>
      <button
        style={{
          padding: "10px",
          height: "fit-content",
        }}
        onClick={getWalletAccess}
      >
        Connect Wallet
      </button>
    </div>
  );
}
