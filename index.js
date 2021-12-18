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
console.log("privateKey : ", privateKey);

const stacksAddress = getAddressFromPrivateKey(
  privateKeyToString(privateKey),
  TransactionVersion.Testnet // remove for mainnet
);

const accounts = new AccountsApi(apiConfig);

async function getAccountInfo() {
  const accountInfo = await accounts.getAccountInfo({
    principal: stacksAddress,
  });

  return accountInfo;
}

const getInfo = async () => {
  const info = await getAccountInfo();
  console.log("info : ", info);
};

getInfo();
