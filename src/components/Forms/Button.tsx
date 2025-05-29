import { PropsWithChildren, ReactNode } from "react";

interface Props {
	icon?: ReactNode;
	text?: string;
	type?: "submit" | "button";
	clickEvent?: () => void;
}

function ButtonComponent({ icon, text, type = "button", clickEvent }: Props) {
	return (
		<button
			type={type}
			onClick={clickEvent}
			className="w-fit h-fit
            text-black rounded-md p-2 bg-zinc-400
            border-2 border-transparent hover:cursor-pointer hover:bg-zinc-500/30 hover:border-zinc-500/90
            hover:text-white/90"
		>
			{icon || text}
		</button>
	);
}

export { ButtonComponent };
