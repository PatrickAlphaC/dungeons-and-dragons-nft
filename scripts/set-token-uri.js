const DungeonsAndDragons = artifacts.require('DungeonsAndDragonsCharacter')
const TOKENID = 0
module.exports = async callback => {
    const dnd = await DungeonsAndDragons.deployed()
    console.log('Let\'s set the tokenURI of your character')
    // const tx = await dnd.setTokenURI(0, "https://ipfs.io/ipfs/QmVKfktQ2hLwPEiGaymEajLQGavGGZDSYkwhdo7M17J2z4?filename=knight.json")
    const tx = await dnd.setTokenURI(1, "https://ipfs.io/ipfs/QmTzQzKymQcv2BhGuVNmfLGePoD43rhQEM5eSkxsLFTB9c?filename=elf.json")
    const tx1 = await dnd.setTokenURI(2, "https://ipfs.io/ipfs/QmREDfvFTT24qC4u7wVXXujtiuP1RfvtHyupwdfGPQDyQi?filename=witch.json")
    const tx2 = await dnd.setTokenURI(3, "https://ipfs.io/ipfs/QmS2u1bPTQdAnDYrXE7qzLxyB6sYx2rN6oo8XkYP6sxbd6?filename=orc.json")
    console.log(tx)
    callback(tx.tx)
}
