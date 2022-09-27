import React from 'react';
import { ethers } from 'ethers';
import { abi, address } from '~/contract.json';

interface AppContextProps {
  provider: ethers.providers.Web3Provider | undefined;
  signer: ethers.providers.JsonRpcSigner | undefined;
  contract: ethers.Contract | undefined;
  counter: number;
  networkError: boolean;
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

  const [networkError, setNetworkError] = React.useState<boolean>(false);

  const init = async () => {
    try {
      /* @ts-ignore */
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);

      const signer = provider.getSigner();
      const contract = new ethers.Contract(address, abi, provider);

      const counter = (await contract?.tokenIdCounter()) - 1;
      setCounter(counter);
      setSigner(signer);
      setContract(contract);
    } catch (error) {
      if (provider?.network?.name !== 'goerli') {
        setNetworkError(true);
        return;
      }
    }
  };

  React.useEffect(() => {
    /* @ts-ignore */
    if (typeof window !== 'undefined' && window.ethereum) {
      /* @ts-ignore */
      window.ethereum.enable().then(() => {
        init();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /////////////////////////////////////////////////////

  return (
    <AppContext.Provider
      value={{
        provider,
        signer,
        contract,
        counter,
        networkError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
