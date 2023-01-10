const FindAuction = () => {
	return (
		<div>
			<h2 className="text-center text-5xl">Find Your Auction</h2>
			<div className="flex justify-center mt-2 mb-12">
				<input
					type="text"
					placeholder="Auction Contract Address"
					className="m-4 w-1/2 rounded-sm p-4 outline-dashed outline-2 outline-gray-500 border-none text-md caret-gray-500 placeholder:text-gray-500 placeholder:italic focus:outline-gray-800 focus:outline focus:text-gray-800"
				/>
			</div>
		</div>
	);
};

export default FindAuction;
