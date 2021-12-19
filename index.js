const { fetch } = require("cross-fetch");
const {
  makeRandomPrivKey,
  privateKeyToString,
  getAddressFromPrivateKey,
  TransactionVersion,
} = require("@stacks/transactions");
const {
  AccountsApi,
  FaucetsApi,
  Configuration,
} = require("@stacks/blockchain-api-client");

const apiConfig = new Configuration({
  fetchApi: fetch,
  basePath: "https://stacks-node-api.testnet.stacks.co",
});

const privateKey = makeRandomPrivKey();
// console.log("privateKey : ", privateKey);

// const stacksAddress = getAddressFromPrivateKey(
//   privateKeyToString(privateKey),
//   TransactionVersion.Testnet // remove for mainnet
// );

// faucet address
// const stacksAddress = "ST2QKZ4FKHAH1NQKYKYAYZPY440FEPK7GZ1R5HBP2";

const stacksAddress = "ST1P8Q8JGPHXB7PVQV42QP962KGV5P77JP6MT8DJ9";

const accounts = new AccountsApi(apiConfig);

async function getAccountInfo() {
  const accountInfo = await accounts.getAccountInfo({
    principal: stacksAddress,
    proof: 0,
  });

  return accountInfo;
}

const getInfo = async () => {
  const info = await getAccountInfo();
  console.log("info : ", info);
};

async function runFaucetStx() {
  const faucets = new FaucetsApi(apiConfig);

  const faucetTx = await faucets.runFaucetStx({
    address: stacksAddress,
  });
  console.log("faucetTx : ", faucetTx);

  return faucetTx;
}

// runFaucetStx();
getInfo();

// https://explorer.stacks.co/txid/0x48b9fb83e66fcd74e513cbb877d94408259d789cdda098dc76f7b06ddb391f53

async function getAccountTransactions() {
  const history = await accounts.getAccountTransactions({
    principal: stacksAddress,
  });
  console.log("history : ", history);

  return history;
}

getAccountTransactions();

async function getAccountBalances() {
  const balances = await accounts.getAccountBalance({
    principal: stacksAddress,
  });

  // The balance field is denoted in micro-STX units. 1,000,000 micro-STX are worth 1 Stacks (STX) token.
  console.log("balance : ", balances);

  return balances;
}

getAccountBalances();
