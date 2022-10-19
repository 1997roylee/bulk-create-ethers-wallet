import { ethers } from "ethers";
import { useCallback, useState } from "react";
import randombytes from "randombytes";
import "./App.css";

async function createWallet() {
  return new Promise((resolve) => {
    const id = randombytes(32).toString("hex");
    const privateKey = "0x" + id;
    // console.log("SAVE BUT DO NOT SHARE THIS:", privateKey);
    resolve(new ethers.Wallet(privateKey));
  }, 20);
}

function App() {
  const [wallets, setWallets] = useState([]);
  const [size, setSize] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const bulkCreateWallets = useCallback(async () => {
    const walletList = [];
    let n = size;
    setIsLoading(true);
    while(n > 0){
      
      n--;
      walletList.push(await createWallet());
    }

    setIsLoading(false);
    setWallets(walletList);
  }, [size]);

  const handleSizeChange = (event) => {
    // size.current = parseInt(event.target.value);
    setSize(parseInt(event.target.value));
  };

  return (
    <div className="App">
      <h1>
      批量創建錢包
        {isLoading? `Creating ${size} Wallets...` : null}
        {/* {doneNumber.current}/{size} */}
      </h1>
      <input
        placeholder="size of the wallets"
        value={size}
        type="number"
        onChange={handleSizeChange}
      />
      <button onClick={bulkCreateWallets}>創建錢包</button>
      <div>
        {wallets.map((wallet, index) => (
          <div key={`Wallet_${index}`} className='wallet'>
            <p>Wallet {index}</p>
            <p>Address: {wallet.address}</p>
            <p>Private key: {wallet.privateKey}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
