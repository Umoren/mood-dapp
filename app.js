import { ethers } from "https://cdn.ethers.io/lib/ethers-5.2.esm.min.js";


const MoodContractAddress = "0x3C83b568Ee5A942bea85A2175456E979465bfBB8"
const MoodContractABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_mood",
				"type": "string"
			}
		],
		"name": "setMood",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getMood",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
let MoodContract;
let signer;

// define provider
const provider = new ethers.providers.Web3Provider(window.ethereum, "ropsten");
// request access to user wallet
provider.send("eth_requestAccounts", []).then(() => {
    provider.listAccounts().then((accounts) => {
        signer = provider.getSigner(accounts[0]);
        MoodContract = new ethers.Contract(
            MoodContractAddress,
            MoodContractABI,
            signer
        );
    });
});
// invoke smart contract
async function getMood() {
    const getMoodPromise = MoodContract.getMood();
    const Mood = await getMoodPromise;
    console.log("Mood here", Mood);
}

async function setMood() {
    const mood = document.getElementById("mood").value;
    const setMoodPromise = MoodContract.setMood(mood);
    await setMoodPromise;
}
