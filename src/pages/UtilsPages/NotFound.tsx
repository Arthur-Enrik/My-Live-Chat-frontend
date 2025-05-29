import { Link } from "react-router-dom";

function NotFound() {
	return (
		<div className="w-full h-full flex flex-col bg-zinc-600 justify-center items-center">
			<h1 className="text-4xl font-bold">404</h1>
			<p className="text-2xl font-bold">A pagina que você acessou não existe</p>
			<Link
				className="w-fit h-fit
            text-black rounded-md p-2 bg-zinc-400
            border-2 border-transparent hover:cursor-pointer hover:bg-zinc-500/30 hover:border-zinc-500/90
            hover:text-white/90 mt-10 font-bold"
				to="/chat"
			>
				Voltar para home
			</Link>
		</div>
	);
}

export { NotFound };
