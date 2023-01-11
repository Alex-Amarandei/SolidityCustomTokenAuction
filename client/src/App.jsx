import { Navbar, Headline, Auction } from "./components/index.jsx";
import { DAppProvider } from "@usedapp/core";

const App = () => {
	return (
		<DAppProvider
			config={{
				supportedChains: [1337],
				multicallAddresses: {
					1337: "0x0833E5637e23066a693Ee96fcC93b9f601ECE979",
				},
			}}
		>
			<div className="bg-gradient-to-r from-blue-200 to-cyan-200 bg-fixed bg-center bg-no-repeat">
				<Navbar />
				<Headline />
				<br /> <br /> <br /> <br />
				<Auction />
			</div>
		</DAppProvider>
	);
};

export default App;
