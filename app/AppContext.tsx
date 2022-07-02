import React from 'react';
import { ethers } from 'ethers';
import { abi, address } from '~/contract.json';

interface AppContextProps {
  provider: ethers.providers.Web3Provider | undefined;
  signer: ethers.providers.JsonRpcSigner | undefined;
  contract: ethers.Contract | undefined;
  counter: number;
}

const AppContext = React.createContext<AppContextProps>(undefined!);

interface AppProviderProps {
  children: React.ReactNode;
}

const AppProvider = ({ children }: AppProviderProps) => {
  const [provider, setProvider] = React.useState<ethers.providers.Web3Provider>();

  const [signer, setSigner] = React.useState<ethers.providers.JsonRpcSigner>();
  const [contract, setContract] = React.useState<ethers.Contract>();

  const [counter, setCounter] = React.useState<number>(0);

  const init = async () => {
    /* @ts-ignore */
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(address, abi, provider);

    const counter = (await contract?.tokenIdCounter()) - 1;
    setCounter(counter);

    setProvider(provider);
    setSigner(signer);
    setContract(contract);
  };

  React.useEffect(() => {
    /* @ts-ignore */
    if (typeof window !== 'undefined' && window.ethereum) {
      init();
    }
  }, []);

  /////////////////////////////////////////////////////

  return (
    <AppContext.Provider
      value={{
        provider,
        signer,
        contract,
        counter,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
