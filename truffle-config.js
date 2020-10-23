const HDWalletProvider = require('@truffle/hdwallet-provider')

module.exports = {
  networks: {
    cldev: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*',
    },
    ganache: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*',
    },
    kovan: {
      provider: () => {
        return new HDWalletProvider(process.env.MNEMONIC, process.env.KOVAN_RPC_URL)
      },
      network_id: '42',
      skipDryRun: true,
    },
  },
  compilers: {
    solc: {
      version: '0.6.6',
    },
  },
}
