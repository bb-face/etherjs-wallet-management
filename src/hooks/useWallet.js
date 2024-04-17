import { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { ethers } from "ethers";

import { walletAddressAtom } from "../state/wallet";
import { providerNetworkAtom } from "../state/providerNetwork";

function useConnectWallet() {
  const setProviderNetwork = useSetRecoilState(providerNetworkAtom);
  const setWalletAddress = useSetRecoilState(walletAddressAtom);

  const [isLoading, setIsLoading] = useState(false);

  const handleAccountsChanged = (accounts) => {
    console.log("-- account is changing");
    const newAddress = accounts.length > 0 ? accounts[0] : null;
    setWalletAddress(newAddress);
  };

  const handleChainChanged = (chainId) => {
    console.log("-- network is changing");
    setProviderNetwork(chainId);
  };

  useEffect(() => {
    let didMount = false;

    const attachEventListeners = () => {
      if (typeof window.ethereum !== "undefined") {
        window.ethereum.on("accountsChanged", handleAccountsChanged);
        window.ethereum.on("chainChanged", handleChainChanged);
      }
    };

    const removeEventListeners = () => {
      if (typeof window.ethereum !== "undefined") {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      }
    };

    if (!didMount) {
      attachEventListeners();
      didMount = true;
    }

    return () => {
      removeEventListeners();
    };
  }, []);

  const connectWallet = async () => {
    setIsLoading(true);
    try {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);

        const signer = provider.getSigner();
        const network = await provider.getNetwork();
        const address = await signer.getAddress();

        setProviderNetwork(network.chainId);
        setWalletAddress(address);
      } else {
        console.log("-- no metamask installed");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { connectWallet, isLoading };
}

export default useConnectWallet;
