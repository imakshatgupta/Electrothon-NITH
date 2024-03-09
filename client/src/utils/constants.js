import Web3 from "web3";
import TransactionsABI from "./Transactions.json";
const contractABI = TransactionsABI.abi;
const web3 = new Web3(window.ethereum);

const contractAddress = "0x63EaA09F1b9Ef1354778b8691454C6e4f229eD2F";

const transactionsContract = new web3.eth.Contract(
  contractABI,
  contractAddress
);

async function makeCryptoPayment(receiverAddress, amount) {
  console.log(receiverAddress, amount);
  const amountCrypto = amount * 1000000000000000000;
  console.log(amountCrypto)
  const accounts = await web3.eth.getAccounts();
  const amountInWei = web3.utils.toWei(amount.toString(), 'ether');

const transaction = await transactionsContract.methods
    .addToBlockchain(receiverAddress, amountCrypto)
    .send({
        from: accounts[0],
        value: amountInWei,
    });
  console.log("Transaction Hash:", transaction.transactionHash);
}

export default makeCryptoPayment;