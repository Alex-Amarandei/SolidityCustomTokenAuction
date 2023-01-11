import { useEthers } from "@usedapp/core";
import logo from "../assets/logo.png";

const Navbar = () => {
	const { account, activateBrowserWallet, deactivate } = useEthers();
	const connected = account !== undefined;

	return (
		<nav class="flex items-center justify-between flex-wrap bg-gradient-to-r from-blue-200 to-cyan-200 p-6">
			<div class="flex items-center flex-shrink-0 mr-6">
				<img class="fill-current h-16 w-64 mr-2" alt="Logo" src={logo} />
			</div>
			<div class="w-full block flex-grow px-8 lg:flex lg:items-center lg:w-auto">
				<div class="text-2xl text-black lg:flex-grow">
					<a
						href="https://profs.info.uaic.ro/~eonica/blockchain/lab09.html#C5"
						target="_blank"
						rel="noopener noreferrer"
						class="block mt-4 px-4 lg:inline-block lg:mt-0 un mr-4"
					>
						Motivation
					</a>
					<a
						href="https://github.com/Alex-Amarandei/SolidityCustomTokenAuction"
						target="_blank"
						rel="noopener noreferrer"
						class="block mt-4 px-4 lg:inline-block lg:mt-0 un"
					>
						Docs
					</a>
				</div>
				<div className="text-2xl text-black">
					{connected ? (
						<button
							href="#"
							class="inline-block px-4 py-2 leading-none border rounded-full border-black bg-gradient-to-r from-cyan-200 to-cyan-300 hover:bg-gradient-to-r hover:from-blue-200 hover:to-blue-300 hover:border-2 hover:font-medium mt-4 lg:mt-0"
							onClick={deactivate}
						>
							Disconnect {account.slice(0, 10)}...
						</button>
					) : (
						<button
							href="#"
							class="inline-block px-4 py-2 leading-none border rounded-full border-black bg-gradient-to-r from-cyan-200 to-cyan-300 hover:bg-gradient-to-r hover:from-blue-200 hover:to-blue-300 hover:border-2 hover:font-medium mt-4 lg:mt-0"
							onClick={activateBrowserWallet}
						>
							Connect Wallet
						</button>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
