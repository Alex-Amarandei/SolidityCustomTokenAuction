import car from "../assets/car.png";
import { BidBar } from "./index.jsx";

const AuctionCard = () => {
	return (
		<div className="flex items-center justify-center">
			<div className="flex flex-col">
				<div className="mx-auto w-3/4 rounded-lg bg-gradient-to-r from-blue-100 to-slate-300 px-10 py-8 shadow-xl">
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
				</div>
				<br /> <br /> <br /> <br />
				<BidBar />
			</div>
		</div>
	);
};

export default AuctionCard;
