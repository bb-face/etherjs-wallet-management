import React from "react";

import useConnectWallet from "../../hooks/useWallet";

function WalletButton() {
  const { connectWallet, isLoading } = useConnectWallet();

  const handleClick = async () => {
    try {
      connectWallet();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={handleClick} disabled={isLoading}>
      {isLoading ? "Connecting..." : "Connect Wallet"}
    </button>
  );
}

export default WalletButton;
