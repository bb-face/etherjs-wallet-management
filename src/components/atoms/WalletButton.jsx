import React, { useState } from "react";
import { ethers } from "ethers";
import { useRecoilState } from "recoil";

import { walletAddressAtom } from "../../state/wallet";

const connectWallet = async () => {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    return address;
  } else {
    console.warning("-- metamask not installed");
    return null;
  }
};

function WalletButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [walletAddress, setWalletAddress] = useRecoilState(walletAddressAtom);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const address = await connectWallet();
      setWalletAddress(address);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button onClick={handleClick} disabled={isLoading}>
      {isLoading ? "Connecting..." : "Connect Wallet"}
    </button>
  );
}

export default WalletButton;
