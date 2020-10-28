const DungeonsAndDragons = artifacts.require('DungeonsAndDragonsCharacter')
const Battles = artifacts.require('Battles')
const LinkTokenInterface = artifacts.require('LinkTokenInterface')

/*
  This script is meant to assist with funding the requesting
  contract with LINK. It will send 1 LINK to the requesting
  contract for ease-of-use. Any extra LINK present on the contract
  can be retrieved by calling the withdrawLink() function.
*/

const payment = process.env.TRUFFLE_CL_BOX_PAYMENT || '1000000000000000000'

module.exports = async callback => {
  try {
    const battles = await Battles.deployed()
    const dnd = await DungeonsAndDragons.deployed()

    const tokenAddress = await battles.getChainlinkToken()
    const token = await LinkTokenInterface.at(tokenAddress)

    console.log('Funding contract:', battles.address)
    const tx = await token.transfer(battles.address, payment)
    console.log(tx)
    console.log('Funding contract:', dnd.address)
    const tx2 = await token.transfer(dnd.address, payment)
    console.log(tx2)
    callback(tx.tx)
  } catch (err) {
    callback(err)
  }
}
