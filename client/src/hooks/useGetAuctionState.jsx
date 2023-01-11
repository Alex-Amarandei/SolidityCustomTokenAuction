import { ethers } from "ethers";
import myAuctionJson from "../contract_builds/contracts/MyAuction.json";

const provider = new ethers.providers.Web3Provider(ethereum);
const myAuctionAbi = myAuctionJson["abi"];

const getState = (number) => {
	if (number == 0) return "CANCELLED";
	else return "STARTED";
};

const useGetAuctionState = async (address) => {
	if (address == "") return "";

	const myAuctionContract = new ethers.Contract(
		address,
		myAuctionAbi,
		provider
	);

	let auctionState = "";

	await myAuctionContract
		.STATE()
		.then((res) => {
			console.log("auctionStateRes", res);
			auctionState = res;
		})
		.catch((error) => console.log("auctionStateError", error));

	return getState(auctionState);
};

export default useGetAuctionState;
