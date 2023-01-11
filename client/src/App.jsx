import {
	Navbar,
	Headline,
	FindAuction,
	AuctionCard,
} from "./components/index.jsx";
import { ChainId, DAppProvider } from "@usedapp/core";

const App = () => {
	return (
		<DAppProvider
			config={{
				supportedChains: [1337],
			}}
		>
			<div className="bg-gradient-to-r from-blue-200 to-cyan-200 bg-fixed bg-center bg-no-repeat">
				<Navbar />
				<Headline />
				<br /> <br /> <br /> <br />
				<FindAuction />
				<br /> <br /> <br /> <br />
				<br /> <br /> <br /> <br />
				<AuctionCard />
			</div>
		</DAppProvider>
	);
};

export default App;
