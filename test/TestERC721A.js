const { ethers, web3 } = require('hardhat')
const { expect } = require('chai')

async function deploy(contractName, ...args) {
    const artifact = await ethers.getContractFactory(contractName)
    return artifact.deploy(...args)
}

describe("StandardERC721A", function () {

    before(async () => {
        this.timeout(100000);
        signers = await ethers.getSigners()
        owner = await signers[0].getAddress()
        console.log("=====>", owner)
        conaddr = await ethers.getContractAt("StandardERC721A", "0xdc698650ca38e2a172d23e60c4e586affbe74564")


        console.log("===>", conaddr.address)
    })

    it("test deploy Erc721A without mint", async  () => {
        let tx = await conaddr.ownerOf(1);
        console.log("====tx is====>", tx)

        // await expect((await tx.wait()).status).equal(1)
    })




})
