import { ethers } from "ethers";
import myAuctionJson from "../contract_builds/contracts/MyAuction.json";

const provider = new ethers.providers.Web3Provider(ethereum);
const myAuctionAbi = myAuctionJson["abi"];

const useGetAuctionEnd = async (address) => {
	if (address == "") return 0;

	const myAuctionContract = new ethers.Contract(
		address,
		myAuctionAbi,
		provider
	);

	let auctionEnd = 0;

	await myAuctionContract
		.auctionEnd()
		.then((res) => {
			console.log("auctionEndRes", res);
			auctionEnd = res;
		})
		.catch((error) => console.log("auctionEndError", error));

	return auctionEnd.toString();
};

export default useGetAuctionEnd;
