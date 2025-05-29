import { User } from "lucide-react";

interface Props {
	name: string;
	selectContact: (name: string) => void;
}

function Contact({ name, selectContact }: Props) {
	return (
		<div
			className="w-full h-10 rounded-md hover:cursor-pointer flex gap-2 items-center p-1 bg-zinc-400"
			onClick={() => selectContact(name)}
		>
			<User />
			<p className="font-bold">{name}</p>
		</div>
	);
}

export { Contact };
