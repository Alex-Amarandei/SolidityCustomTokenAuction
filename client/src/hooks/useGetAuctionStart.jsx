import { ethers } from "ethers";
import myAuctionJson from "../contract_builds/contracts/MyAuction.json";

const provider = new ethers.providers.Web3Provider(ethereum);
const myAuctionAbi = myAuctionJson["abi"];

const useGetAuctionStart = async (address) => {
	if (address == "") return 0;

	const myAuctionContract = new ethers.Contract(
		address,
		myAuctionAbi,
		provider
	);

	let auctionStart = 0;

	await myAuctionContract
		.auctionStart()
		.then((res) => {
			console.log("auctionStartRes", res);
			auctionStart = res;
		})
		.catch((error) => console.log("auctionStartError", error));

	return auctionStart.toString();
};

export default useGetAuctionStart;
