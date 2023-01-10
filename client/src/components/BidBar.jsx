const BidBar = () => {
	return (
		<div>
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
				/>
				<button className="border-2 border-black rounded-lg my-4 px-4 bg-gradient-to-r from-cyan-200 to-cyan-300 hover:bg-gradient-to-r hover:from-blue-200 hover:to-blue-300 hover:border-2 hover:font-medium">
					Bid
				</button>
			</div>
		</div>
	);
};

export default BidBar;
