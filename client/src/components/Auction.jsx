import { default as BidBar } from "./BidBar.jsx";
import car from "../assets/car.png";
import { useEffect, useState } from "react";
import {
	useGetAllAuctions,
	useGetAuctionEnd,
	useGetAuctionStart,
	useGetAuctionState,
	useGetCar,
	useGetHighestBid,
	useGetHighestBidder,
} from "../hooks/index.jsx";
import { useEthers } from "@usedapp/core";

function timeConverter(UNIX_timestamp) {
	var a = new Date(UNIX_timestamp * 1000);
	var months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	var year = a.getFullYear();
	var month = months[a.getMonth()];
	var date = a.getDate();
	var hour = a.getHours();
	var min = a.getMinutes();
	var sec = a.getSeconds();
	var time =
		date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
	return time;
}

const Auction = () => {
	const { account, activateBrowserWallet, deactivate } = useEthers();
	const connected = account !== undefined;

	const validateAuctionAddress = async () => {
		console.log("potentialAuction", typeof potentialAuction);
		console.log("allAuctions", allAuctions[0]);
		console.log(allAuctions.includes(potentialAuction));

		setIsAuctionValid(allAuctions.includes(potentialAuction));
	};

	const [isAuctionValid, setIsAuctionValid] = useState(false);

	const [potentialAuction, setPotentialAuction] = useState("");

	const [allAuctions, setAllAuctions] = useState([]);

	const getAllAuctions = useGetAllAuctions();

	useEffect(() => {
		setAllAuctions(getAllAuctions);
	}, [getAllAuctions]);

	/////////////////////////////////////////////

	const [auctionEnd, setAuctionEnd] = useState("");

	let getAuctionEnd = useGetAuctionEnd("");

	useEffect(() => {
		getAuctionEnd = useGetAuctionEnd(potentialAuction);

		getAuctionEnd
			.then((res) => {
				setAuctionEnd(res);
				console.log("setAuctionEnd", res);
			})
			.catch((error) => {
				console.log("setAuctionEndError", error);
			});
	}, [isAuctionValid]);

	// /////////////////////////////////////////////

	const [auctionStart, setAuctionStart] = useState("");

	let getAuctionStart = useGetAuctionStart("");

	useEffect(() => {
		getAuctionStart = useGetAuctionStart(potentialAuction);

		getAuctionStart
			.then((res) => {
				setAuctionStart(res);
				console.log("setAuctionStart", res);
			})
			.catch((error) => {
				console.log("setAuctionStartError", error);
			});
	}, [isAuctionValid]);

	// /////////////////////////////////////////////

	const [auctionState, setAuctionState] = useState("");

	let getAuctionState = useGetAuctionState("");

	useEffect(() => {
		getAuctionState = useGetAuctionState(potentialAuction);

		getAuctionState
			.then((res) => {
				setAuctionState(res);
				console.log("setAuctionState", res);
			})
			.catch((error) => {
				console.log("setAuctionStateError", error);
			});
	}, [isAuctionValid]);

	useEffect(() => {
		if (parseInt(auctionEnd) < parseInt(Math.floor(Date.now() / 1000))) {
			setAuctionState("CANCELLED");
		}
	});

	// /////////////////////////////////////////////

	const [auctionCar, setAuctionCar] = useState("");

	let getAuctionCar = useGetCar("");

	useEffect(() => {
		getAuctionCar = useGetCar(potentialAuction);

		getAuctionCar
			.then((res) => {
				setAuctionCar(res);
				console.log("setAuctionCar", res);
			})
			.catch((error) => {
				console.log("setAuctionCarError", error);
			});
	}, [isAuctionValid]);

	// /////////////////////////////////////////////

	const [auctionHighestBid, setAuctionHighestBid] = useState("");

	let getAuctionHighestBid = useGetHighestBid("");

	useEffect(() => {
		getAuctionHighestBid = useGetHighestBid(potentialAuction);

		getAuctionHighestBid
			.then((res) => {
				setAuctionHighestBid(res);
				console.log("setAuctionHighestBid", res);
			})
			.catch((error) => {
				console.log("setAuctionHighestBidError", error);
			});
	}, [isAuctionValid]);

	// /////////////////////////////////////////////

	const [auctionHighestBidder, setAuctionHighestBidder] = useState("");

	let getAuctionHighestBidder = useGetHighestBidder("");

	useEffect(() => {
		getAuctionHighestBidder = useGetHighestBidder(potentialAuction);

		getAuctionHighestBidder
			.then((res) => {
				setAuctionHighestBidder(res);
				console.log("setAuctionHighestBidder", res);
			})
			.catch((error) => {
				console.log("setAuctionHighestBidderError", error);
			});
	}, [isAuctionValid]);

	/////////////////////////////////////////////

	return (
		<div>
			<h2 className="text-center text-5xl">Find Your Auction</h2>
			<div className="flex justify-center mt-2 mb-12">
				<input
					type="text"
					placeholder="Auction Contract Address"
					className="m-4 w-1/2 rounded-sm p-4 outline-dashed outline-2 outline-gray-500 border-none text-md caret-gray-500 placeholder:text-gray-500 placeholder:italic focus:outline-gray-800 focus:outline focus:text-gray-800"
					onChange={(e) => {
						setPotentialAuction(e.target.value);
					}}
				/>
				<button
					className="border-2 border-black rounded-lg my-4 px-4 bg-gradient-to-r from-cyan-200 to-cyan-300 hover:bg-gradient-to-r hover:from-blue-200 hover:to-blue-300 hover:border-2 hover:font-medium"
					onClick={() => validateAuctionAddress()}
				>
					Search
				</button>
			</div>
			<br /> <br /> <br /> <br />
			<br /> <br /> <br /> <br />
			<div className="flex items-center justify-center">
				<div className="flex flex-col">
					<div className="mx-auto w-3/4 rounded-lg bg-gradient-to-r from-blue-100 to-slate-300 px-10 py-8 shadow-xl">
						{isAuctionValid ? (
							<div className="flex flex-row">
								<div class="flex-1 mx-auto space-y-6 text-xl">
									<div class="mx-auto space-y-6 text-center text-2xl underline underline-offset-8">
										<h3>Auction</h3>
									</div>
									<ul>
										<li className="my-16">
											<b>Auction Start Time (Timestamp): </b>
											<i>
												{timeConverter(auctionStart)} ({auctionStart})
											</i>
										</li>
										<li className="my-16">
											<b>Car Brand: </b> <i>{auctionCar.carBrand}</i>
										</li>
										<li className="my-16">
											<b>Registration Number: </b>
											<i>{auctionCar.carRegistrationNumber}</i>
										</li>
										<li className="my-16">
											<b>Auction State:</b> <i>{auctionState}</i>
										</li>
										<li className="my-16">
											<b>Highest Bid (Bidder Address): </b>
											<i>
												{auctionHighestBid} ({auctionHighestBidder})
											</i>
										</li>
										<li className="my-16">
											<b>Auction End (Timestamp): </b>
											<i>
												{timeConverter(auctionEnd)} ({auctionEnd})
											</i>
										</li>
									</ul>
								</div>
								<div className="flex-1 mt-40 -mr-32">
									<img src={car} alt="Car" />
								</div>
							</div>
						) : (
							<h1 className="text-9xl -mt-14 mr-10 opacity-0 cursor-default">
								_
							</h1>
						)}
					</div>
					<br /> <br /> <br /> <br />
					{isAuctionValid && connected ? (
						<BidBar
							auctionState={auctionState}
							auctionAddress={potentialAuction}
						/>
					) : (
						<br />
					)}
				</div>
			</div>
		</div>
	);
};

export default Auction;
