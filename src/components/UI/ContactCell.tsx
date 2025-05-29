import { User } from "lucide-react";

import { TOKEN } from "../../utils/token.utils";
import { API } from "../../utils/fetch.utils";

interface Props {
	username: string;
	email: string;
}

function ContactCell({ email, username }: Props) {
	async function addUser(email: string) {
		const [res, data] = await API.post<{ success: boolean; message: string }>(
			"/chats",
			{ email },
			TOKEN.get()
		);

		if (!data.success || !res.ok) {
			alert("Ocorreu um erro ao adicionar usuário, tente novamente mais tarde");
			return;
		}

		alert(data.message);
	}

	return (
		<div
			onClick={() => addUser(email)}
			className="flex text-white font-bold bg-zinc-600 border-1 border-transparent p-1 gap-1 items-center rounded-md hover:bg-zinc-600/50 hover:cursor-pointer hover:border-zinc-400"
		>
			<User />
			<p className="w-fit p-1 bg-zinc-600/10 text-center">{username}</p>
			<p className="w-fit p-1 bg-zinc-600/10 text-center">{email}</p>
		</div>
	);
}

export { ContactCell };
