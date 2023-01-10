import {
	Navbar,
	Headline,
	FindAuction,
	AuctionCard,
} from "./components/index.jsx";

const App = () => {
	return (
		<div className="bg-gradient-to-r from-blue-200 to-cyan-200 bg-fixed bg-center bg-no-repeat">
			<Navbar />
			<Headline />
			<br /> <br /> <br /> <br />
			<FindAuction />
			<br /> <br /> <br /> <br />
			<br /> <br /> <br /> <br />
			<AuctionCard />
		</div>
	);
};

export default App;
