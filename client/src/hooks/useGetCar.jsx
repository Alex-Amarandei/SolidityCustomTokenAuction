import { ethers } from "ethers";
import myAuctionJson from "../contract_builds/contracts/MyAuction.json";

const provider = new ethers.providers.Web3Provider(ethereum);
const myAuctionAbi = myAuctionJson["abi"];

const useGetCar = async (address) => {
	if (address == "") return {};

	const myAuctionContract = new ethers.Contract(
		address,
		myAuctionAbi,
		provider
	);

	let car = {};

	await myAuctionContract
		.myCar()
		.then((res) => {
			console.log("myCarRes", res);
			car = res;
		})
		.catch((error) => console.log("myCarError", error));

	return {
		carBrand: car["brand"],
		carRegistrationNumber: car["rNumber"],
	};
};

export default useGetCar;
