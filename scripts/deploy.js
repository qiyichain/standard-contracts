// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.

const path = require("path");
const hardhat = require('hardhat');
const web3 = require('@nomicfoundation/hardhat-network-helpers')
const { ethers, artifacts } = hardhat;
const { expect } = require('chai')


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


    addressList = await ethers.getContractAt("AddressList", "0x000000000000000000000000000000000000F003")
    let tx = await addressList.addDeveloper(didProxy.address)
    await expect((await tx.wait()).status).equal(1)

    let tx2 = await didProxy.transferOwnership("0xC2ED445Ee8DC5791662C574CE21dA57Ba5F2c79f")
    await expect((await tx2.wait()).status).equal(1)

    // tx = await addressList.addDeveloper('0xC2ED445Ee8DC5791662C574CE21dA57Ba5F2c79f')
    // await expect((await tx.wait()).status).equal(1)

    tx = await deployer.sendTransaction({
        to: '0xC2ED445Ee8DC5791662C574CE21dA57Ba5F2c79f',
        value: ethers.utils.parseEther("50000000000") // 500亿
    })
    await expect((await tx.wait()).status).equal(1)


    // 0x8054b6F9EDf88b36BE2431f01E8a3D7fF433252c  // 代理合约
    // 0xCCb632cdC419500015bc3fDad6335e348f007a76  // 手续费
    // tx = await addressList.addDeveloper('0x8054b6F9EDf88b36BE2431f01E8a3D7fF433252c')
    // await expect((await tx.wait()).status).equal(1)


    // tx = await addressList.addDeveloper('0xCCb632cdC419500015bc3fDad6335e348f007a76')
    // await expect((await tx.wait()).status).equal(1)

    // // let tx2 = await didProxy.transferOwnership("0xC2ED445Ee8DC5791662C574CE21dA57Ba5F2c79f")
    // let tx2 = await didProxy.transferOwnership("0x8054b6F9EDf88b36BE2431f01E8a3D7fF433252c")
    // await expect((await tx2.wait()).status).equal(1)

    // tx = await deployer.sendTransaction({
    //     to: '0x8054b6F9EDf88b36BE2431f01E8a3D7fF433252c',
    //     value: ethers.utils.parseEther("500000000") // 5亿
    // })
    // await expect((await tx.wait()).status).equal(1)

    // tx = await deployer.sendTransaction({
    //     to: '0xCCb632cdC419500015bc3fDad6335e348f007a76',
    //     value: ethers.utils.parseEther("2000000000") // 20亿
    // })
    // await expect((await tx.wait()).status).equal(1)



    // We also save the contract's artifacts and address in the frontend directory
    // saveFrontendFiles(didProxy);
}

// function saveFrontendFiles(didProxy) {
//     const fs = require("fs");
//     const contractsDir = path.join(__dirname, "..", "frontend", "src", "contracts");

//     if (!fs.existsSync(contractsDir)) {
//         fs.mkdirSync(contractsDir);
//     }

//     fs.writeFileSync(
//         path.join(contractsDir, "contract-address.json"),
//         JSON.stringify({ DidProxy: didProxy.address }, undefined, 2)
//     );

//     const DidProxyArtifact = artifacts.readArtifactSync("DidProxy");

//     fs.writeFileSync(
//         path.join(contractsDir, "DidProxy.json"),
//         JSON.stringify(DidProxyArtifact, null, 2)
//     );
// }

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
