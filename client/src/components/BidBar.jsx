import { useState } from "react";
import { useApproveToken, useBidToken, useWithdraw } from "../hooks/index.jsx";

const BidBar = ({ auctionState, auctionAddress }) => {
	const [bid, setBid] = useState(-1);
	const [hasBidded, setHasBidded] = useState(false);
	const [hasWithdrawn, setHasWithdrawn] = useState(false);

	const validateBid = (e) => {
		if (
			parseInt(e.target.value, 10) != NaN &&
			parseInt(e.target.value, 10) > 0
		) {
			console.log("bidValue", parseInt(e.target.value, 10));
			setBid(parseInt(e.target.value, 10));
		} else {
			setBid(-1);
		}
	};

	const approveTokenSpend = () => {
		console.log("bidBeforeSpend", bid);
		let getUseApproveToken = useApproveToken(auctionAddress, bid);

		getUseApproveToken
			.then((res) => {
				setIsApproved(res);
				console.log("setIsApprovedRes", res);
			})
			.catch((error) => {
				console.log("setIsApprovedError", error);
				setIsApproved(false);
			});
	};

	const bidToken = () => {
		approveTokenSpend();

		let getBidToken = useBidToken(auctionAddress, bid);

		getBidToken
			.then((res) => {
				console.log("bidTokenRes", res);
			})
			.catch((error) => {
				console.log("bidTokenError", error);
			});

		setHasBidded(true);
	};

	const initiateWithdraw = () => {
		let getWithdraw = useWithdraw(auctionAddress);

		getWithdraw
			.then((res) => {
				console.log("withdrawRes", res);
			})
			.catch((error) => {
				console.log("withdrawError", error);
			});

		setHasWithdrawn(true);
	};

	return (
		<div>
			{auctionState == "STARTED" ? (
				<>
					{hasBidded ? (
						<>
							<h2 className="text-center text-5xl">Only one bid per account</h2>
							<br />
							<h3 className="text-center text-xl">
								(Wait until the auction is closed and you can withdraw your
								funds)
							</h3>

							<div className="flex justify-center mt-2 mb-12">
								<input
									disabled={hasBidded}
									type="text"
									placeholder="Integer Amount of ZAO Tokens"
									className="m-4 w-1/2 rounded-sm p-4 outline-dashed outline-2 outline-gray-500 border-none text-md caret-gray-500 placeholder:text-gray-500 placeholder:italic focus:outline-gray-800 focus:outline focus:text-gray-800"
									onChange={(e) => validateBid(e)}
								/>
								<button
									disabled={hasBidded}
									className="border-2 border-black rounded-lg my-4 px-4 bg-gradient-to-r from-cyan-200 to-cyan-300 hover:bg-gradient-to-r hover:from-blue-200 hover:to-blue-300 hover:border-2 hover:font-medium"
									onClick={() => {
										bid != -1 ? bidToken() : false;
									}}
								>
									Oops
								</button>
							</div>
						</>
					) : (
						<>
							<h2 className="text-center text-5xl">Make Your Bid</h2>
							<br />
							<h3 className="text-center text-xl">
								(It must be greater than the highest so far)
							</h3>

							<div className="flex justify-center mt-2 mb-12">
								<input
									type="text"
									placeholder="Integer Amount of ZAO Tokens"
									className="m-4 w-1/2 rounded-sm p-4 outline-dashed outline-2 outline-gray-500 border-none text-md caret-gray-500 placeholder:text-gray-500 placeholder:italic focus:outline-gray-800 focus:outline focus:text-gray-800"
									onChange={(e) => validateBid(e)}
								/>
								<button
									className="border-2 border-black rounded-lg my-4 px-4 bg-gradient-to-r from-cyan-200 to-cyan-300 hover:bg-gradient-to-r hover:from-blue-200 hover:to-blue-300 hover:border-2 hover:font-medium"
									onClick={() => {
										bid != -1 ? bidToken() : false;
									}}
								>
									Bid
								</button>
							</div>
						</>
					)}
				</>
			) : (
				<>
					{hasWithdrawn ? (
						<>
							<h2 className="text-center text-5xl">
								You have already withdrawn
							</h2>
							<br />
							<h3 className="text-center text-xl">
								(Or you are the lucky winner! Check if your address matches the
								highest bidder)
							</h3>

							<div className="flex justify-center mt-2 mb-12">
								<button
									disabled={hasWithdrawn}
									className="border-2 border-black rounded-lg my-4 px-4 bg-gradient-to-r from-cyan-200 to-cyan-300 hover:bg-gradient-to-r hover:from-blue-200 hover:to-blue-300 hover:border-2 hover:font-medium"
									onClick={() => initiateWithdraw()}
								>
									Withdraw
								</button>
							</div>
						</>
					) : (
						<>
							<h2 className="text-center text-5xl">Withdraw your bid</h2>
							<br />
							<h3 className="text-center text-xl">
								(If you are not the winner, of course)
							</h3>

							<div className="flex justify-center mt-2 mb-12">
								<button
									className="border-2 border-black rounded-lg my-4 px-4 bg-gradient-to-r from-cyan-200 to-cyan-300 hover:bg-gradient-to-r hover:from-blue-200 hover:to-blue-300 hover:border-2 hover:font-medium"
									onClick={() => initiateWithdraw()}
								>
									Withdraw
								</button>
							</div>
						</>
					)}
				</>
			)}
		</div>
	);
};

export default BidBar;
