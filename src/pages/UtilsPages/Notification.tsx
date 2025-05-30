interface Props {
	message: string;
	type: "WARN" | "ERR" | "MSG";
}

function Notify({ type, message }: Props) {
	function generateConfig(type: string) {
		switch (type) {
			case "ERR":
				return "bg-red-500 text-white";
			case "WARN":
				return "bg-yellow-300";
			default:
				return "bg-white/90";
		}
	}
	return (
		<div
			className={`fixed top-5 right-1/2 translate-x-1/2 p-2 rounded-md font-bold ${generateConfig(
				type
			)}`}
		>
			<p className="text-center font-bold">{message}</p>
		</div>
	);
}

export { Notify };
