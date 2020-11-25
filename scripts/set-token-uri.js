const DungeonsAndDragons = artifacts.require('DungeonsAndDragonsCharacter')
const TOKENID = 0
module.exports = async callback => {
    const dnd = await DungeonsAndDragons.deployed()
    console.log('Let\'s set the tokenURI of your character')
    const tx = await dnd.setTokenURI(TOKENID, "ipfs_url_here")
    console.log(tx)
    callback(tx.tx)
}
