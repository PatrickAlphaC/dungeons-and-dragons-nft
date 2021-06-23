const DungeonsAndDragons = artifacts.require('DungeonsAndDragonsCharacter')

module.exports = async callback => {
    console.log(process.env.DOG)
    callback('sup')
}
