const { ethers, web3 } = require('hardhat')
const { expect } = require('chai')

async function deploy(contractName, ...args) {
    const artifact = await ethers.getContractFactory(contractName)
    return artifact.deploy(...args)
}

describe("DidProxy", function () {

    before(async () => {
        this.timeout(100000);
        signers = await ethers.getSigners()
        owner = await signers[0].getAddress()
        console.log("=====>", owner)
        didproxy = await deploy('DidProxy' )
        // didproxy = await ethers.getContractAt("DidProxy", "0xc8486e00d165B2d8C256d230c14B43A64A12aC48")


        console.log("===>", didproxy.address)
    })

    it("test deploy Erc721A without mint", async  () => {
        let tx = await didproxy.deployERC721A(
            "YFH",
            "RARE",
            "https://ipfs.2312321ifaj/",
            Math.round(Math.random() * 100000),
            false,
            Math.round(Math.random() * 100000),
            owner
        )

        await expect((await tx.wait()).status).equal(1)

    })

    it("test deploy Erc721A with mint", async  () => {
        let tx = await didproxy.deployERC721A(
            "YFH",
            "RARE",
            "https://ipfs.2312321ifaj/",
            Math.round(Math.random() * 100000),
            true,
            10000,
            owner
        )

        await expect((await tx.wait()).status).equal(1)

    })

    it("test deploy Erc721A with mint but owner is msg.sender", async  () => {
        let o1 = await didproxy.owner()
        console.log("owner of didproxy is ", o1)
        let tx = await didproxy.deployERC721A(
            "YFH",
            "RARE",
            "https://ipfs.2312321ifaj/",
            Math.round(Math.random() * 100000),
            true,
            10000,
            "0x8284B6412ef6eFA75adDEa85f07E7de5f8F8ec48"
        )
        let o = await didproxy.owner()
        expect(o).equal(owner);
        console.log("owner of didproxy is ", o)

        await expect((await tx.wait()).status).equal(1)
    })

    it("test deploy erc721", async  ()=> {
        let tx = await didproxy.deployERC721(
            "YFH",
            "RARE",
            "https://ipfs.2312321ifaj/",
            Math.round(Math.random() * 100000),
            owner
        )

        await expect((await tx.wait()).status).equal(1)
    })



})
