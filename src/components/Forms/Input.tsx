import { PropsWithChildren, ReactNode } from "react";

interface Props {
	icon?: ReactNode;
	placeholder: string;
	required: boolean;
	state: string;
	setState: (value: string) => void;
	type?: "text" | "email" | "password";
}

function InputComponent({ icon, placeholder, required, type = "text", state, setState }: Props) {
	return (
		<div
			className="w-full h-full flex justify-center
         items-center p-1 bg-zinc-400 border-2 text-black border-zinc-700/20
         rounded-md"
		>
			{icon}
			<input
				className="w-full h-full bg-transparent p-2 outline-none"
				required={required}
				type={type}
				placeholder={placeholder}
				onChange={(e) => setState(e.target.value)}
				value={state}
			/>
		</div>
	);
}

export { InputComponent };
