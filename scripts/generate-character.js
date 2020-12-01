const DungeonsAndDragons = artifacts.require('DungeonsAndDragonsCharacter')

module.exports = async callback => {
  const dnd = await DungeonsAndDragons.deployed()
  console.log('Creating requests on contract:', dnd.address)
  const tx = await dnd.requestNewRandomCharacter(77, "The Chainlink Knight")
  const tx2 = await dnd.requestNewRandomCharacter(7777777, "The Chainlink Elf")
  const tx3 = await dnd.requestNewRandomCharacter(7, "The Chainlink Wizard")
  const tx4 = await dnd.requestNewRandomCharacter(777, "The Chainlink Orc")
  callback(tx.tx)
}
