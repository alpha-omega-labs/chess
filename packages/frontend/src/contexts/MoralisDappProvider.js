import React, { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import MoralisDappContext from './MoralisCotext';
import GameContract from '../contracts/GameContract.json';
import NFTContract from '../contracts/NFT.json';
import MarketPlaceContract from '../contracts/MarketPlace.json';

function MoralisDappProvider({ children }) {
  const { web3, Moralis, user } = useMoralis();
  const [walletAddress, setWalletAddress] = useState();
  const [chainId, setChainId] = useState();

  const [gameAddress, setGameAddress] = useState(
    '0x82f4e339F7a699EB1462F00F1C6d295629c49BF7',
  );
  const [nftContract, setNftContract] = useState(
    '0x1B4792286bdfD8700507D8E922207B12Ba9c7588',
  );
  const [marketPlace, setMarketPlace] = useState(
    '0x7BD96Db0aa7018928Bc146761B8F10B1f081B195',
  );

  const [gameContractABI, setGameContractABI] = useState(GameContract.abi);
  const [nftContractABI, setNftContractABI] = useState(NFTContract.abi);
  const [marketPlaceAbi, setMarketPlaceAbi] = useState(MarketPlaceContract.abi);

  useEffect(() => {
    Moralis.onChainChanged(function (chain) {
      setChainId(chain);
    });

    Moralis.onAccountsChanged(function (address) {
      setWalletAddress(address[0]);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setChainId(web3.givenProvider?.chainId));
  useEffect(
    () =>
      setWalletAddress(
        web3.givenProvider?.selectedAddress || user?.get('ethAddress'),
      ),
    [web3, user],
  );

  return (
    <MoralisDappContext.Provider
      value={{
        walletAddress,
        chainId,
        gameAddress,
        setGameAddress,
        gameContractABI,
        setGameContractABI,
        nftContract,
        nftContractABI,
        marketPlace,
        marketPlaceAbi,
      }}
    >
      {children}
    </MoralisDappContext.Provider>
  );
}

function useMoralisDapp() {
  const context = React.useContext(MoralisDappContext);
  if (context === undefined) {
    throw new Error('useMoralisDapp must be used within a MoralisDappProvider');
  }
  return context;
}

export { MoralisDappProvider, useMoralisDapp };
