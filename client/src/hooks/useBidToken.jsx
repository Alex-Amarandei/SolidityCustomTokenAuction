import { ethers } from "ethers";
import myAuctionJson from "../contract_builds/contracts/MyAuction.json";

const provider = new ethers.providers.Web3Provider(ethereum);
const myAuctionAbi = myAuctionJson["abi"];

const useBidToken = async (auctionAddress, value) => {
	const myAuctionContract = new ethers.Contract(
		auctionAddress,
		myAuctionAbi,
		provider.getSigner()
	);

	let response = false;
	console.log("valueHere", value);

	await myAuctionContract
		.bid(value)
		.then((res) => {
			console.log("bidTokenRes", res);
			response = res;
		})
		.catch((error) => {
			console.log("bidTokenError", error);
		});

	return response;
};

export default useBidToken;
