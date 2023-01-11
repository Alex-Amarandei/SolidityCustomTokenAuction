import { default as BidBar } from "./BidBar.jsx";
import car from "../assets/car.png";
import { useEffect, useState } from "react";
import { useGetAllAuctions } from "../hooks/index.jsx";

const Auction = () => {
	const validateAuctionAddress = () => {
		console.log("potentialAuction", potentialAuction);
		console.log("allAuctions", allAuctions);

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
										<h3>Auction #1</h3>
									</div>
									<ul>
										<li className="my-16">
											<b>Auction Start Time (Timestamp): </b>
											<i>09.01.2023 (1234567890)</i>
										</li>
										<li className="my-16">
											<b>Car Brand:</b> <i>ZOA</i>
										</li>
										<li className="my-16">
											<b>Registration Number:</b> <i>MISS1</i>
										</li>
										<li className="my-16">
											<b>Auction State:</b> <i>STARTED</i>
										</li>
										<li className="my-16">
											<b>Highest Bid (Bidder Address): </b>
											<i>1 ZAO (0x1234567890123456789012345678901234567890)</i>
										</li>
										<li className="my-16">
											<b>Auction End (Timestamp):</b> <i>-</i>
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
					{isAuctionValid ? <BidBar /> : <br />}
				</div>
			</div>
		</div>
	);
};

export default Auction;
