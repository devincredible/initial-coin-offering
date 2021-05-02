module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" //match any network id
    }
  },
  compilers: {
    solc: {
      version: "0.4.24"
    }
 },  
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
}
