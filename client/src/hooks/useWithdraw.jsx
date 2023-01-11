import { ethers } from "ethers";
import myAuctionJson from "../contract_builds/contracts/MyAuction.json";

const provider = new ethers.providers.Web3Provider(ethereum);
const myAuctionAbi = myAuctionJson["abi"];

const useWithdraw = async (auctionAddress, value) => {
	const myAuctionContract = new ethers.Contract(
		auctionAddress,
		myAuctionAbi,
		provider.getSigner()
	);

	let response = false;

	await myAuctionContract
		.withdraw()
		.then((res) => {
			console.log("withdrawRes", res);
			response = res;
		})
		.catch((error) => {
			console.log("withdrawError", error);
		});

	return response;
};

export default useWithdraw;
