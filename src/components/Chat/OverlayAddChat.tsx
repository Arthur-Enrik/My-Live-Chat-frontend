import { X } from "lucide-react";

import { API } from "../../utils/fetch.utils";
import { TOKEN } from "../../utils/token.utils";

import { ContactCell } from "../UI/ContactCell";

interface Props {
	setUsersFoundByEmail: (users: Array<{ username: string; email: string }>) => void;
	showOverlay: (show: boolean) => void;
	Users?: Array<{ username: string; email: string }>;
}

function OverlayAddChat({ setUsersFoundByEmail, showOverlay, Users }: Props) {
	async function changeInputAddChat(email: string) {
		if (!email || !email.trim()) return;
		const [res, data] = await API.get<{
			success: boolean;
			message: string;
			users: Array<{ username: string; email: string }>;
		}>(`/users/search?email=${email}`, TOKEN.get());

		if (!data.success || !res.ok) {
			alert("Ocorreu um erro no servidor, tente novament mais tarde");
			return;
		}

		setUsersFoundByEmail(data.users);
	}

	return (
		<div className="w-screen h-screen fixed backdrop-blur-xs flex flex-col justify-center items-center">
			<div className="inset-0 w-1/4 h-1/2 flex flex-col p-1 gap-1 rounded-md shadow-xl bg-zinc-800 border-1 border-zinc-400">
				<button
					onClick={() => showOverlay(false)}
					className="text-white w-fit h-fit border-1 border-zinc-400 p-1 rounded-md self-end hover:cursor-pointer hover:bg-zinc-400 hover:text-zinc-800"
				>
					<X />
				</button>
				<div className="h-full w-full flex flex-col gap-1 overflow-y-auto">
					{Users && Users.length > 0 ? (
						Users.map((item) => (
							<ContactCell email={item.email} username={item.username} key={item.email} />
						))
					) : (
						<span className="w-full text-white p-1 font-bold text-center">
							Nenhum usuário foi encontrado
						</span>
					)}
				</div>
				<div className="h-fit w-full">
					<input
						className="w-full h-fit p-2 rounded-md bg-zinc-700 outline-none text-white"
						onChange={(e) => changeInputAddChat(e.target.value)}
						placeholder="Digite o email"
						type="text"
					/>
				</div>
			</div>
		</div>
	);
}

export { OverlayAddChat };
