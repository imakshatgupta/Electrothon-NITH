const NFT = require("../models/nftModel");

const claimSuccess = async (req, res) => {
    const nft = await NFT.find(); 
    if (nft.length > 0) {
        nft.shift(); 
    }
    res.status(200).json(nft);
};

module.exports = {
  claimSuccess,
};
