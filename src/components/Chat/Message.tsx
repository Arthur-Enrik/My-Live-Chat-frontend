interface Props {
	message: string;
	isOwner: boolean;
	id: string;
}

function Message({ message, isOwner, id }: Props) {
	return (
		<div
			id={id}
			className={`w-fit max-w-1/2 h-fit rounded-md bg-zinc-500 p-1 ${
				isOwner ? "self-end" : "self-start"
			}`}
		>
			<p className="w-fit h-fit p-1 font-bold text-center">{message}</p>
		</div>
	);
}

export { Message };
