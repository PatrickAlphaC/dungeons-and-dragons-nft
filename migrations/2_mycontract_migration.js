const DungeonsAndDragonsCharacter = artifacts.require('DungeonsAndDragonsCharacter')
const RINKEBY_VRF_COORDINATOR = '0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B'
const RINKEBY_LINKTOKEN = '0xa36085f69e2889c224210f603d836748e7dc0088'
const RINKEBY_KEYHASH = '0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311'

module.exports = async (deployer, network, [defaultAccount]) => {
  // hard coded for rinkeby
  if (network.startsWith('rinkeby')) {
    await deployer.deploy(DungeonsAndDragonsCharacter, RINKEBY_VRF_COORDINATOR, RINKEBY_LINKTOKEN, RINKEBY_KEYHASH)
    let dnd = await DungeonsAndDragonsCharacter.deployed()
  } else if (network.startsWith('mainnet')) {
    console.log("If you're interested in early access to Chainlink VRF on mainnet, please email vrf@chain.link")
  } else {
    console.log("Right now only rinkeby works! Please change your network to Rinkeby")
    // await deployer.deploy(DungeonsAndDragonsCharacter)
    // let dnd = await DungeonsAndDragonsCharacter.deployed()
  }
}
