require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-chai-matchers");
require("@nomiclabs/hardhat-web3");

// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.
require("./tasks/deploy.js");
require("./tasks/checkTx.js");
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// 线上账号资源
const accounts = [

  "0x5ea30eea9ba9500f3601f7659f0ccace819c562456e2f745fb2555918ab32277",
  "0x5f65803b6cc25c409a827d040b24b503c0ce829ae5637f2eef6252b9c0c1cbb2",
  "0xebe7a49fa9f36018b7956812a3b610034f250e1dce7eb0da9f8510882e3e80b6",
  "0x5ea30eea9ba9500f3601f7659f0ccace819c562456e2f745fb2555918ab32277",
  "0xebe7a49fa9f36018b7956812a3b610034f250e1dce7eb0da9f8510882e3e80b6",
  "0x0a720a3cbca383cd38092db6911c41637fb39703792e970fcaef8ac72de671ac",
];

// curl -X POST -H "Content-type:application/json" --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}' http://172.16.100.21:8545

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "qiyichain",
  mocha: {
    timeout: 60000,
  },
  networks: {
    qiyichain: {
      url: "http://xxxxxxxxxxx:xxxx", // 测试网
      accounts: accounts,
      chainId: 2285, // We set 1337 to make interacting with MetaMask simpler
      gas: 40000000,
      gasPrice: 2000000000,
      minGasPrice: 1000000000,
      // gas: 1000000
    },
    mumbai: {
      // Polygon的测试网
      url: "https://rpc-mumbai.maticvigil.com/",
      //   url: "https://polygon-mumbai.g.alchemy.com/v2/uwf-pmUDMekFyYfxbbYWMUya8cv-bj65/",
      chainId: 80001,
      gasPrice: 1100000000,
      accounts: accounts,
      gas: 20000000,
    },
    matic: {
      // Polygon主网
      url: "https://rpc-mainnet.maticvigil.com/",
      gasPrice: 1100000000,
      accounts: accounts,
      chainId: 137,
      gas: 20000000,
    },
    bsctestnet: {
      // bsc 测试网
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      gasPrice: 5000000000,
    //   minGasPrice: 5000000000,
      accounts: accounts,
      chainId: 97,
      gas: 20000000,
    },
    bsc: {
      // bsc 主网
      url: "https://bsc-dataseed1.binance.org/",
      gasPrice: 5000000000,
    //   minGasPrice: 5000000000,
      accounts: accounts,
      chainId: 56,
      gas: 20000000,
    },
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: "./contracts/",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};
