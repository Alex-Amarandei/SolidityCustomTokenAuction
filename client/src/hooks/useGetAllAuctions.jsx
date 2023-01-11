import mapJson from "../contract_builds/deployments/map.json";

const useGetAllAuctions = () => {
	return mapJson["1337"]["MyAuction"];
};

export default useGetAllAuctions;
