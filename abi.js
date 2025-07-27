const contractABI = [
  {
    "inputs": [
      { "internalType": "address", "name": "_usdt", "type": "address" },
      { "internalType": "address", "name": "_kjc", "type": "address" },
      { "internalType": "address", "name": "_router", "type": "address" },
      { "internalType": "address", "name": "_distributor", "type": "address" }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "address", "name": "from", "type": "address" },
      { "indexed": false, "internalType": "address", "name": "to", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" },
      { "indexed": false, "internalType": "uint8", "name": "level", "type": "uint8" }
    ],
    "name": "ReferralRewardAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "address", "name": "user", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "name": "ReferralRewardClaimed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "address", "name": "user", "type": "address" },
      { "indexed": false, "internalType": "address", "name": "referrer", "type": "address" }
    ],
    "name": "ReferrerSet",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "address", "name": "user", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "index", "type": "uint256" },
      { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "name": "StakeRewardClaimed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "address", "name": "user", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "index", "type": "uint256" },
      { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "name": "Staked",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "address", "name": "user", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "index", "type": "uint256" },
      { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "name": "Unstaked",
    "type": "event"
  },
  { "inputs": [], "name": "MIN_PURCHASE", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "REF_CLAIM_INTERVAL", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "STAKE_APR", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "STAKE_CLAIM_INTERVAL", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "STAKE_LOCK_PERIOD", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "uint256", "name": "usdtAmount", "type": "uint256" }], "name": "buyWithReferralAndStake", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [], "name": "claimReferralReward", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [{ "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "claimStakeReward", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [], "name": "distributor", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "getKJCperUSDT", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  {
    "inputs": [
      { "internalType": "address", "name": "user", "type": "address" },
      { "internalType": "uint256", "name": "index", "type": "uint256" }
    ],
    "name": "getStake",
    "outputs": [
      { "internalType": "uint256", "name": "amount", "type": "uint256" },
      { "internalType": "uint256", "name": "startTime", "type": "uint256" },
      { "internalType": "uint256", "name": "lastClaimTime", "type": "uint256" },
      { "internalType": "bool", "name": "claimed", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "getStakeCount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "kjc", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "address", "name": "referrer", "type": "address" }], "name": "registerReferrer", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [], "name": "router", "outputs": [{ "internalType": "contract IPancakeRouter", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "address", "name": "_d", "type": "address" }], "name": "setDistributor", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  {
    "inputs": [
      { "internalType": "address", "name": "", "type": "address" },
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "name": "stakes",
    "outputs": [
      { "internalType": "uint256", "name": "amount", "type": "uint256" },
      { "internalType": "uint256", "name": "startTime", "type": "uint256" },
      { "internalType": "uint256", "name": "lastClaimTime", "type": "uint256" },
      { "internalType": "bool", "name": "claimed", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  { "inputs": [{ "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "unstake", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [], "name": "usdt", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "pendingReferralReward", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "referrerOf", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "hasReferred", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "lastReferralClaim", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }
];
