import React from "react";
import { useRecoilValue } from "recoil";

import { walletAddressAtom } from "../../state/wallet";
import { providerNetworkAtom } from "../../state/providerNetwork";

function WalletInfo() {
  const walletAddress = useRecoilValue(walletAddressAtom);
  const network = useRecoilValue(providerNetworkAtom);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
        wallet address:
        <span style={{ fontWeight: "bold" }}>{walletAddress}</span>
      </div>
      <div>
        network: <span style={{ fontWeight: "bold" }}>{network}</span>
      </div>
    </div>
  );
}

export default WalletInfo;
