const { ethers, web3 } = require('hardhat')
const { expect } = require('chai')

async function deploy(contractName, ...args) {
    const artifact = await ethers.getContractFactory(contractName)
    return artifact.deploy(...args)
}

BASEURI = 'https://api.cryptokitties.co/kitties/'

describe("DidProxy", function () {

    before(async () => {
        this.timeout(100000);
        signers = await ethers.getSigners()
        owner = await signers[0].getAddress()
        console.log("=====>", owner)
        didproxy = await deploy('DidProxy' )
        // didproxy = await ethers.getContractAt("DidProxy", "0xc8486e00d165B2d8C256d230c14B43A64A12aC48")

        addressList = await ethers.getContractAt("AddressList", "0x000000000000000000000000000000000000F003")
        let tx = await addressList.addDeveloper(didproxy.address)
        // expect()
        await expect((await tx.wait()).status).equal(1)


        console.log("===>", didproxy.address)
    })




    it("test deploy Erc721A without mint", async  () => {
        let tx = await didproxy.deployERC721A(
            "ERC721A",
            "ERC721A",
            BASEURI,
            Math.round(Math.random() * 100000),
            false,
            Math.round(Math.random() * 100000),
            owner
        )

        await expect((await tx.wait()).status).equal(1)

    })

    it("test deploy Erc721A with mint", async  () => {
        let tx = await didproxy.deployERC721A(
            "ERC721A",
            "ERC721A",
            BASEURI,
            Math.round(Math.random() * 100000),
            true,
            3000,
            owner
        )

        await expect((await tx.wait()).status).equal(1)

    })

    it("test deploy Erc721A with mint but owner is msg.sender", async  () => {
        let o1 = await didproxy.owner()
        console.log("owner of didproxy is ", o1)
        let tx = await didproxy.deployERC721A(
            "ERC721A",
            "ERC721A",
            BASEURI,
            Math.round(Math.random() * 100000),
            true,
            3000,
            "0x8284B6412ef6eFA75adDEa85f07E7de5f8F8ec48"
        )
        let o = await didproxy.owner()
        expect(o).equal(owner);
        console.log("owner of didproxy is ", o)

        await expect((await tx.wait()).status).equal(1)
    })

    // it("test deploy erc1155", async  ()=> {
    //     let tx = await didproxy.deployERC1155(
    //         "YFH",
    //         "RARE",
    //         "https://ipfs.2312321ifaj/",
    //         Math.round(Math.random() * 100000),
    //         true,
    //         10000,
    //         owner
    //     )

    //     await expect((await tx.wait()).status).equal(1)
    // })

    // 如果mint数量太大，需要消耗的Gas非常多
    it("test deploy erc721", async  ()=> {
        let tx = await didproxy.deployERC721(
            "ERC721",
            "ERC721",
            BASEURI,
            Math.round(Math.random() * 100000),
            true,
            2,
            "0x8284B6412ef6eFA75adDEa85f07E7de5f8F8ec48",
        )

        await expect((await tx.wait()).status).equal(1)
    })






})
