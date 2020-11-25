# Chainlink Random Character Creation

This repo is a starting point for creating:
1. NFTs built with verifiable RNG using the [Chainlink VRF](https://docs.chain.link/docs/get-a-random-number)
2. Create dynamic NFTs that change based on real world data. [By using decentralized oracles to get data.](https://docs.chain.link/docs/make-a-http-get-request)
3. Adding your randomized NFTs to the [OpenSea Marketplace](https://opensea.io/)

We will easily create our own NFT on the Rinkeby Chain. We can edit the name of the character in the [`generate-character.js`](./scripts/generate-character.js) script. 

This will create a character with 6 attributes from 0 - 99:
 -   uint256 strength;
 -   uint256 dexterity;
 -   uint256 constitution;
 -   uint256 intelligence;
 -   uint256 wisdom;
 -   uint256 charisma;

And then:
 -   uint256 experience;
 -   string name;

## Quickstart

Right now this repo only works with rinkeby. Run the following.

### Setup Environment Variables
You'll need a `MNEMONIC` and a rinkeby `RINKEBY_RPC_URL` environment variable. Your `MNEMONIC` is your seed phrase of your wallet. You can find an `RINKEBY_RPC_URL` from node provider services like [Infura](https://infura.io/)

Then, either set them in a `bash_profile` file or export them into your terminal like:

```bash
export MNEMONIC='cat dog frog....'
export RINKEBY_RPC_URL='www.infura.io/asdfadsfafdadf'
```

Then you can get started with:

### Clone The Repo and migrate
```
git clone https://github.com/PatrickAlphaC/dungeons-and-dragons-nft
cd dungeons-and-dragons-nft
npm install
truffle migrate --reset --network rinkeby
```

This will deploy your D&D NFT!

### Generate a character
You can now try it out:
```bash
truffle exec scripts/fund-contract.js --network rinkeby
truffle exec scripts/generate-character.js --network rinkeby
truffle exec scripts/get-character.js --network rinkeby
```

This will create a new character with random stats! 
Depending how often you deploy, you can pick which character by changing the [`dnd.getCharacterOverView(1)`](contracts/DungeonsAndDragonsCharacter.sol) command in `get-character.js` to swap the `0` out with whatever `tokenId` of the character you like. 

This will give you the overview of your NFT. You'll see `BN` since the call returns big numbers, you can cast them to ints to see what they are.... Or you could go one step farther

### See it on etherscan or onclickdapp

You can get an [Etherscan API key](https://etherscan.io/apis) for free and interact with the NFTs on chain. Then set `ETHERSCAN_API_KEY ` as an environment variable.

```bash
truffle run verify DungeonsAndDragonsCharacter --network rinkeby --license MIT
```

This will verify and publish your contract, and you can go to the `Read Contract` section of etherscan that it gives you. 

Otherwise, you can use [oneclickdapp](https://oneclickdapp.com/) and just add the contract address and ABI. You can find the ABI in the `build/contracts` folder. Just remember it's not the whole file that is the ABI, just the section that says `ABI`.