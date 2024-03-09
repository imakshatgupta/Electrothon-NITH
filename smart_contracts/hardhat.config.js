require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    polygon: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/nKGo6re_ITH5XULUq-wxrZvS6yMm2JBO",
      accounts: [
        "b48a1c3a4cffe7dd7ac36742811ded621212416d3cad6e3255b0b348353bc9c1",
      ],
    },
  },
};

// 0x5566B5dee6e74dF49d16513A525F6C742C98a0C2