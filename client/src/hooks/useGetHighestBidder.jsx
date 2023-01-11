import { ethers } from "ethers";
import myAuctionJson from "../contract_builds/contracts/MyAuction.json";

const provider = new ethers.providers.Web3Provider(ethereum);
const myAuctionAbi = myAuctionJson["abi"];

const useGetHighestBidder = async (address) => {
	if (address == "") return "";

	const myAuctionContract = new ethers.Contract(
		address,
		myAuctionAbi,
		provider
	);

	let highestBidder = 0;

	await myAuctionContract
		.highestBidder()
		.then((res) => {
			console.log("highestBidderRes", res);
			highestBidder = res;
		})
		.catch((error) => console.log("highestBidderError", error));

	return highestBidder.toString();
};

export default useGetHighestBidder;
