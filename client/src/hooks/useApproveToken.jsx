import { ethers } from "ethers";
import zaoTokenJson from "../contract_builds/contracts/ZAOToken.json";
import mapJson from "../contract_builds/deployments/map.json";

const provider = new ethers.providers.Web3Provider(ethereum);
const zaoTokenAbi = zaoTokenJson["abi"];
const zaoTokenAddress = mapJson["1337"]["ZAOToken"][0];

const useApproveToken = async (auctionAddress, value) => {
	const zaoTokenContract = new ethers.Contract(
		zaoTokenAddress,
		zaoTokenAbi,
		provider.getSigner()
	);

	let response = false;

	await zaoTokenContract
		.approve(auctionAddress, value)
		.then((res) => {
			console.log("approveHookRes", res);
			response = res;
		})
		.catch((error) => {
			console.log("approveHookError", error);
		});

	return response;
};

export default useApproveToken;
