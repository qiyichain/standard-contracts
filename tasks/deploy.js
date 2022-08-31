task('deploy', 'erc721', async (_, {ethers,web3 }) => {
  async function getInstance() {
    // Get the ContractFactory and Signers here.
    const contractAddress = "0xF751C1474d5917C7202Df184fF3C44Ca6aE1B699";
    const myContract = await ethers.getContractAt("DidProxy", contractAddress);

    const [owner, addr1, addr2] = await ethers.getSigners();
    // Fixtures can return anything you consider useful for your tests
    return { myContract, owner, addr1, addr2 };
  }
  async function getInstanceByAddress(caddr, cname) {
    // Get the ContractFactory and Signers here.
    return await ethers.getContractAt(cname, caddr);
  }

  const { myContract, owner, addr1 } = await getInstance();

  // const tx =  await myContract.safeTransfer(addr1.address, 10000);
  // console.log('tx' ,tx)

    const deploycTx = await myContract.deployERC721A(
      "YFH",
      "RARE",
      "https://ipfs.2312321ifaj/",
      12,
      false,
      0,
      owner.address
    ,{
      gasLimit: 1000000
    })

    console.log('deploycTx', deploycTx)
    web3.eth.getTransaction(deploycTx.hash, async (err, result) => {
      console.log('err', err, 'result', result)
    })

    // const erc721ainstance = await getInstanceByAddress(erc721addr, "DIDERC721A")
    // console.log('erc721ainstance', erc721ainstance);

    // const tx = await erc721ainstance.mint(10);

    // console.log('tx' ,tx.hash)
    // web3.eth.getTransaction(tx.hash, async (err, result) => {
    //   console.log('err', err, 'result', result)
    //   const t = await erc721ainstance.totalSupply();
    //   console.log('t' ,t)
    // })

})