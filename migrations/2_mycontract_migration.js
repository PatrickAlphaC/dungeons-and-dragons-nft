const DungeonsAndDragons = artifacts.require('DungeonsAndDragonsCharacter')
const Battles = artifacts.require('Battles')

module.exports = async (deployer, network, [defaultAccount]) => {
  // hard coded for rinkeby
  if (network.startsWith('rinkeby')) {
    await deployer.deploy(DungeonsAndDragons)
    let dnd = await DungeonsAndDragons.deployed()
  } else {
    console.log("Right now only rinkeby works! Please change your network to Rinkeby")
    await deployer.deploy(DungeonsAndDragons)
    let dnd = await DungeonsAndDragons.deployed()
  }
}
