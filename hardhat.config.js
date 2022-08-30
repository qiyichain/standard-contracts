require("@nomicfoundation/hardhat-toolbox");

// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.
require("./tasks/faucet");

// 线上账号资源
const accounts = [
  '0xebe7a49fa9f36018b7956812a3b610034f250e1dce7eb0da9f8510882e3e80b6',
  '0x5ea30eea9ba9500f3601f7659f0ccace819c562456e2f745fb2555918ab32277',
  '0xebe7a49fa9f36018b7956812a3b610034f250e1dce7eb0da9f8510882e3e80b6',
  '0x0a720a3cbca383cd38092db6911c41637fb39703792e970fcaef8ac72de671ac'
]

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "qiyichain",
  networks: {
    qiyichain: {
      url: "http://119.23.237.46:8545", // 线上
      // url: "http://192.168.110.37:8545", // 本地
      accounts: accounts,
      chainId: 12285, // We set 1337 to make interacting with MetaMask simpler
      gasPrice: 1000000000,
      // gas: 1000000
    }
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000
      }
    }
  },
  paths: {
    sources: "./contracts/",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
};

