const DungeonsAndDragons = artifacts.require('DungeonsAndDragonsCharacter')
const Battles = artifacts.require('Battles')

module.exports = async (deployer, network, [defaultAccount]) => {
  await deployer.deploy(DungeonsAndDragons)
  let dnd = await DungeonsAndDragons.deployed()
  await deployer.deploy(Battles, dnd.address)
  let battles = await Battles.deployed()
  await dnd.setBattlesContract(battles.address)
}
