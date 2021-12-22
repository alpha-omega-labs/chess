import { CONFIG } from '../config';
const { NETWORK_CONFIG } = CONFIG;

export const SUPPORTED_NETWORKS = [29];

export const rpcUrls = {
  29: 'https://rpc.genesisl1.org/',
};

export const networkNames = {
  29: 'genesisL1',
};

export const pgn2gifURL = 'https://pgn2gif.glitch.me/thing';

export const CREATE_MATCH = 'CREATE_MATCH';
export const JOIN_MATCH = 'JOIN_MATCH';

export const GAME_OUTCOME = {
  PLAYER_ONE: 'playerOne',
  PLAYER_TWO: 'playerTwo',
  DRAW: 'draw',
};
