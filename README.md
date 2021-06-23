# Chainlink Random Character Creation

This repo is a starting point for creating:
1. NFTs built with verifiable RNG using the [Chainlink VRF](https://docs.chain.link/docs/get-a-random-number)
2. Create dynamic NFTs that change based on real world data. [By using decentralized oracles to get data.](https://docs.chain.link/docs/make-a-http-get-request)
3. Adding your randomized NFTs to the [OpenSea Marketplace](https://opensea.io/)

Skip down to [deploy To Opensea](#deploy-to-opensea) - to see how to add a tokenURI

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

Then, you can create a `.env` file with the following.

```bash
MNEMONIC='cat dog frog....'
RINKEBY_RPC_URL='www.infura.io/asdfadsfafdadf'
```

Or, set them in a `bash_profile` file or export them directly into your terminal. You can learn more about [environment variables here](https://www.twilio.com/blog/2017/01/how-to-set-environment-variables.html). 

To run them directly in your terminal, run: 
```bash
export MNEMONIC='cat dog frog....'
export RINKEBY_RPC_URL='www.infura.io/asdfadsfafdadf'
```

Then you can get started with:

### Clone The Repo and migrate
```
git clone https://github.com/PatrickAlphaC/dungeons-and-dragons-nft
cd dungeons-and-dragons-nft
yarn
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

### See it on etherscan or oneclickdapp

You can get an [Etherscan API key](https://etherscan.io/apis) for free and interact with the NFTs on chain. Then set `ETHERSCAN_API_KEY ` as an environment variable.

```bash
yarn add truffle-plugin-verify
truffle run verify DungeonsAndDragonsCharacter --network rinkeby --license MIT
```

This will verify and publish your contract, and you can go to the `Read Contract` section of etherscan that it gives you. 

Otherwise, you can use [oneclickdapp](https://oneclickdapp.com/) and just add the contract address and ABI. You can find the ABI in the `build/contracts` folder. Just remember it's not the whole file that is the ABI, just the section that says `ABI`.


# Deploy to Opensea

Once we have our NFTs created, we need to give them a `tokenURI`. TokenURIs are the standard for showing the data of NFTs to the world. This makes it easier to store things like images since we don't have to waste the gas of adding them on-chain. 

The [TokenURI](https://eips.ethereum.org/EIPS/eip-721) represents a URL or other unique identifier, and it is an `.json` file with a few parameters.

```
{
    "name": "Name for it ",
    "description": "Anything you want",
    "image": "https://ipfs.io/ipfs/HASH_HERE?file.png",
    "attributes": [...]
}
```

We are going to be storing these images and meta data in IPFS. You'll need both:
1. [IPFS](https://ipfs.io/)
2. [IPFS companion](https://chrome.google.com/webstore/detail/ipfs-companion/nibjojkomfdiaoajekhjakgkdhaomnch?hl=en)
3. [Pinata](https://pinata.cloud/pinataupload)

IPFS is a peer to peer network for storing files. It's free and open sourced, and we can use it to host our tokenURI. The IPFS companion let's us view IPFS data nativly in our browsers like Brave or Chrome. And Pinata allows us to keep our IPFS files up even when our node is down (don't worry about that for now)

Once our IPFS node is up, we can start adding files to it. We first want to upload the image of our NFT. What does this D&D character look like? Add it to your IPFS node and then "Pin" it. Once pinned, you can get the CID of the pinned file, and make sure it stays pinned by pinning it on your Pinata account. Don't worry, it's free! This will just help keep the data up even when our IPFS node is down. 

Once we have the image pinned and up, we can get the link for that image. It'll look a little something like this:

`https://ipfs.io/ipfs/QmTgqnhFBMkfT9s8PHKcdXBn1f5bG3Q5hmBaR4U6hoTvb1?filename=Chainlink_Elf.png`

This is a real link, and if you click it and nothing renders, your IPFS companion might not be working, or your IPFS node is down. 

Once we have our image, we can add it to our metadata `.json` file, and add our stats in there. You can see some samples in the `metadata` folder. We want to use the values of our characters that we got off-chain, so be sure to verify what the random numbers you got on etherscan! Once we have the .json metadata file, we want to add that to IPFS as well, and pin it too!

This metadata json file is going to be our `tokenURI`, so we will modify our `set-token-uri.js` with the `tokenId` of the NFT we are giving a picture to, and adding the ipfs tokenURI.

Then we just run it like:

```
truffle exec scripts/set-token-uri.js --network rinkeby
```

Now, we can get the address of our NFT and head on over to the opensea testnet marketplace to see if we did it correctly. If done correctly, it'll look [something like this](https://testnets.opensea.io/assets/dungeonsanddragonscharacter-v9).

[Here is the link for adding your testnet NFT contract to be viewed on opensea.](https://testnets.opensea.io/get-listed/step-two)
