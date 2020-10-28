const DungeonsAndDragons = artifacts.require('DungeonsAndDragonsCharacter')

module.exports = async callback => {
    const dnd = await DungeonsAndDragons.deployed()
    console.log('Let\'s get the overview of your character')
    const overview = await dnd.getCharacterOverView(1)
    console.log(overview)
    console.log('Now let\'s get some stats')
    const stats = await dnd.getCharacterStats(1)
    console.log(stats)
    callback(stats.tx)
}
