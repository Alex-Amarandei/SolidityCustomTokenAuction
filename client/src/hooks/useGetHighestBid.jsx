import { ethers } from "ethers";
import myAuctionJson from "../contract_builds/contracts/MyAuction.json";

const provider = new ethers.providers.Web3Provider(ethereum);
const myAuctionAbi = myAuctionJson["abi"];

const useGetHighestBid = async (address) => {
	if (address == "") return "0";

	const myAuctionContract = new ethers.Contract(
		address,
		myAuctionAbi,
		provider
	);

	let highestBid = 0;

	await myAuctionContract
		.highestBid()
		.then((res) => {
			console.log("highestBidRes", res);
			highestBid = res;
		})
		.catch((error) => console.log("highestBidError", error));

	return highestBid.toString();
};

export default useGetHighestBid;
