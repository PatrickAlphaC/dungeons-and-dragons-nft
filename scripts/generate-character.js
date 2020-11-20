const DungeonsAndDragons = artifacts.require('DungeonsAndDragonsCharacter')

module.exports = async callback => {
  const dnd = await DungeonsAndDragons.deployed()
  console.log('Creating request on contract:', dnd.address)
  const tx = await dnd.requestNewRandomCharacter(6453, "Julian the Wizard")
  const tx = await dnd.requestNewRandomCharacter(23413, "Bork the Orc")
  const tx = await dnd.requestNewRandomCharacter(12, "Not Shrek the Knight")
  const tx = await dnd.requestNewRandomCharacter(76, "Blue Sir the Elf")
  callback(tx.tx)
}
