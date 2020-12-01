const DungeonsAndDragons = artifacts.require('DungeonsAndDragonsCharacter')
const TOKENID = 0
module.exports = async callback => {
    const dnd = await DungeonsAndDragons.deployed()
    console.log('Let\'s set the tokenURI of your characters')
    const tx = await dnd.setTokenURI(0, "https://ipfs.io/ipfs/QmaSED9ZSbdGts5UZqueFJjrJ4oHH3GnmGJdSDrkzpYqRS?filename=the-chainlink-knight.json")
    const tx1 = await dnd.setTokenURI(1, "https://ipfs.io/ipfs/QmTvsVaaHTuMNmwXgbfgkrztFEazAPyzmrb4VSS2PbqLjA?filename=the-chainlink-elf.json")
    const tx2 = await dnd.setTokenURI(2, "https://ipfs.io/ipfs/QmPZQhiBB6pwcxRgwZe2mx6ZizCPYgq8i4FBMETyWK1V2z?filename=the-chainlink-wizard.json")
    const tx3 = await dnd.setTokenURI(3, "https://ipfs.io/ipfs/QmS6aznzxshLMcECPQZjCR94UF22WHu6FMM5HLQvaYL9NP?filename=the-chainlink-orc.json")
    console.log(tx)
    callback(tx.tx)
}
