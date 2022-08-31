import { expect } from "chai";
import { ethers, web3 } from "hardhat";


describe("DidProxy", function () {
  async function getInstance() {
    // Get the ContractFactory and Signers here.
    const contractAddress = "0xFdF3700Cb3601455EA163Bb6a12c7A3F54c2524D";
    const myContract = await ethers.getContractAt("DidProxy", contractAddress);

    const [owner, addr1, addr2] = await ethers.getSigners();
    // Fixtures can return anything you consider useful for your tests
    return { myContract, owner, addr1, addr2 };
  }
  async function getInstanceByAddress(caddr: string, cname: string) {
    // Get the ContractFactory and Signers here.
    return await ethers.getContractAt(cname, caddr);
  }

  it("deploy erc721", async function () {
    // ...
    const { myContract, owner, addr1 } = await getInstance();

    const erc721addr = await myContract.deployERC721A(
      "YFH",
      "RARE",
      "https://ipfs.2312321ifaj/",
      false,
      0,
      owner.address
    )

    const erc721ainstance = getInstanceByAddress(erc721addr, "DIDERC721A")
    console.log('erc721ainstance', erc721ainstance);

    // web3.eth.getTransaction(tx.hash, (err, result) => {
    //   console.log('err', err, 'result', result)
    // })
  });
});