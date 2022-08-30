// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.

const path = require("path");
const hardhat = require('hardhat');
const { ethers, artifacts } = hardhat;

async function main() {
  // This is just a convenience check
  // if (network.name === "hardhat") {
  //   console.warn(
  //     "You are trying to deploy a contract to the Hardhat Network, which" +
  //       "gets automatically created and destroyed every time. Use the Hardhat" +
  //       " option '--network localhost'"
  //   );
  // }

  // ethers is available in the global scope
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const DidProxy = await ethers.getContractFactory("DidProxy");
  const didProxy = await DidProxy.deploy(deployer.getAddress());
  await didProxy.deployed();

  console.log("didProxy address:", didProxy.address);

  // We also save the contract's artifacts and address in the frontend directory
  saveFrontendFiles(didProxy);
}

function saveFrontendFiles(didProxy) {
  const fs = require("fs");
  const contractsDir = path.join(__dirname, "..", "frontend", "src", "contracts");

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    path.join(contractsDir, "contract-address.json"),
    JSON.stringify({ DidProxy: didProxy.address }, undefined, 2)
  );

  const DidProxyArtifact = artifacts.readArtifactSync("DidProxy");

  fs.writeFileSync(
    path.join(contractsDir, "DidProxy.json"),
    JSON.stringify(DidProxyArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
