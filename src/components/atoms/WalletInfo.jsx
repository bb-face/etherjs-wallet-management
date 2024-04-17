import React from "react";
import { useRecoilValue } from "recoil";

import { walletAddressAtom } from "../../state/wallet";

function WalletInfo() {
  const walletAddress = useRecoilValue(walletAddressAtom);

  return (
    <div>
      {walletAddress ? (
        <p>Connected Address: {walletAddress}</p>
      ) : (
        <p>Wallet not connected.</p>
      )}
    </div>
  );
}

export default WalletInfo;
