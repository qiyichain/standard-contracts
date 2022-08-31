

task('checkTx',   'erc721' ,(_, { ethers, web3 }) => {

  const tx = '0x45d38a937f429650ab5e7b0781e1956fab97ce72c5daafde3b348bb043e3e3e6';
  web3.eth.getTransaction(tx, async (err, result) => {
    console.log('err', err, 'result', result)
  })

  web3.eth.getTransactionReceipt(tx, 'hex', (err, result) => {
    console.log('err', err, 'result', result)
  })
})