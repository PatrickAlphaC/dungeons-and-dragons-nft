const DungeonsAndDragons = artifacts.require('DungeonsAndDragonsCharacter')

module.exports = async callback => {
  const dnd = await DungeonsAndDragons.deployed()
  console.log('Creating request on contract:', dnd.address)
  const tx = await dnd.requestNewRandomCharacter(77, "Julian the Knight")
  const tx2 = await dnd.requestNewRandomCharacter(7777777, "Sergey the Elf")
  const tx3 = await dnd.requestNewRandomCharacter(7, "Ari the Witch")
  const tx4 = await dnd.requestNewRandomCharacter(777, "Pepe the Orc")
  callback(tx.tx)
}
