
const { LinkToken } = require('@chainlink/contracts/truffle/v0.4/LinkToken')
const DungeonsAndDragonsCharacter = artifacts.require('DungeonsAndDragonsCharacter.sol')
contract('DungeonsAndDragonsCharacter', accounts => {
    const defaultAccount = accounts[0]

    let link, dnd

    beforeEach(async () => {
        link = await LinkToken.new({ from: defaultAccount })
        dnd = await DungeonsAndDragonsCharacter.new({ from: defaultAccount })
    })

    describe('#requestNewRandomCharacter', () => {

    })

})  