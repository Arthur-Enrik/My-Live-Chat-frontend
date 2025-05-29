import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

import { Plus } from "lucide-react";

// Utils
import { API } from "../utils/fetch.utils";
import { TOKEN } from "../utils/token.utils";

// Components
import { Contact } from "../components/Chat/Contact";
import { ButtonComponent } from "../components/Forms/Button";
import { InputComponent } from "../components/Forms/Input";
import { Message } from "../components/Chat/Message";
import { OverlayAddChat } from "../components/Chat/OverlayAddChat";

// Interfaces
interface IChat {
	_id: string;
	username: string;
	messages: Array<{ message: string; isOwner: boolean; id: string }>;
}

interface UserChat {
	[key: string]: IChat;
}

const socket = io("http://localhost:3000", {
	auth: {
		token: TOKEN.get(),
	},
});

function Chat() {
	const navigate = useNavigate();
	const [chats, setChats] = useState<UserChat | null>(null);
	const [activeChatName, setActiveChat] = useState<string | null>(null);

	const activeChat = useMemo(() => {
		if (!chats || !activeChatName) return;
		const activeChat = Object.values(chats).find((item) => item.username === activeChatName);
		return activeChat;
	}, [activeChatName, chats]);

	const [messageInput, setMessageInput] = useState("");

	const chatNames = useMemo(() => {
		if (!chats) return;

		const chatNames = Object.values(chats).map((item) => item.username);

		return chatNames;
	}, [chats]);

	// State for add chat
	const [showAddChatOverlay, setShowAddChatOverlay] = useState<boolean>(false);
	const [usersFoundByEmail, setUsersFoundByEmail] =
		useState<Array<{ email: string; username: string }>>();

	useEffect(() => {
		socket.on("connect", () => console.log("Conectado!"));
		socket.on("connect_error", (error) => {
			alert("Ocorreu um erro ao se conectar no servidor");
			console.error(`Ocorreu um erro ao se conectar no servidor ${error}`);
		});
		//
		socket.on("message:received", ({ from, message }) => receivedMessageHandle(from, message));

		const fetchChats = async () => {
			const [res, data] = await API.get<{ success: boolean; message: string; chats: UserChat }>(
				"/chats",
				TOKEN.get()
			);
			if (res.status === 401) {
				navigate("/login");
			}
			if (!res.ok || !data.success) {
				alert("Ocorreu um erro no servidor, tente novamente mais tarde");
				return;
			}
			setChats(data.chats);
		};
		fetchChats();

		return () => {
			socket.disconnect();
			socket.off("connect");
			socket.off("connect_error");
			socket.off("message:received");
		};
	}, []);

	function changeActiveChat(username: string) {
		if (!chats) return;

		const activeChat = Object.values(chats).find((item) => item.username === username);

		if (!activeChat) return;

		setActiveChat(username);
	}

	function receivedMessageHandle(senderId: string, message: string) {
		setChats((prevChats) => {
			if (!prevChats) {
				return prevChats;
			}
			if (!prevChats[senderId]) {
				console.warn("chat não encontrado");
				return prevChats;
			}

			const newMessageObj = {
				message,
				isOwner: false,
				id: crypto.randomUUID(),
			};

			const chatToUpdate = prevChats[senderId];

			const updatedMessage = [...chatToUpdate.messages, newMessageObj];

			const updatedChats: UserChat = {
				...prevChats,
				[senderId]: {
					...chatToUpdate,
					messages: updatedMessage,
				},
			};
			return updatedChats;
		});
	}

	function senderMessageHandle(message: string) {
		setMessageInput("");

		if (!message.trim()) return;
		if (!activeChat || !chats) return;

		const receiverId = activeChat._id;

		if (!receiverId) return;
		socket.emit("message:sended", { receivedId: receiverId, message });
		setChats((prevChats) => {
			if (!prevChats) {
				return prevChats;
			}

			const newMessageObj = {
				message,
				isOwner: true,
				id: crypto.randomUUID(),
			};

			const chatToUpdate = prevChats[receiverId];

			const updatedMessage = [...chatToUpdate.messages, newMessageObj];

			const updatedChats: UserChat = {
				...prevChats,
				[receiverId]: {
					...chatToUpdate,
					messages: updatedMessage,
				},
			};
			return updatedChats;
		});
	}

	return (
		<main className="bg-zinc-900 flex items-center w-1/2 h-1/2 rounded-md shadow-md border-1 border-purple-500/5">
			<nav className="w-1/4 h-full p-1 rounded-md bg-zinc-800 flex flex-col relative gap-1">
				{chatNames && chatNames.length > 0 ? (
					chatNames?.map((name) => (
						<Contact key={name} name={name} selectContact={changeActiveChat} />
					))
				) : (
					<span className="w-full text-white text-center font-bold">
						Você ainda não possui nenhuma conversa
					</span>
				)}
				<button
					onClick={() => setShowAddChatOverlay(!showAddChatOverlay)}
					className="bottom-1 right-1 p-1 w-fit h-fit absolute text-white rounded-md border-1 border-zinc-500/20 bg-zinc-600/20 hover:cursor-pointer hover:bg-zinc-300 hover:text-zinc-800"
				>
					<Plus />
				</button>
			</nav>

			<section className="flex flex-col w-full h-full bg-zinc-900">
				<section className="w-full h-9 rounded-md bg-zinc-800 flex justify-center items-center">
					<div className="w-1/4 h-full p-1 bg-zinc-900/40 rounded-md">
						<p className="w-full h-full font-bold text-center text-white">
							{activeChatName && activeChatName}
						</p>
					</div>
				</section>
				<section className="w-full h-full overflow-y-auto p-2 flex flex-col gap-1">
					{activeChat &&
						activeChat.messages.map((item) => (
							<Message message={item.message} isOwner={item.isOwner} id={item.id} key={item.id} />
						))}
				</section>

				<form
					onSubmit={(e) => {
						e.preventDefault();
						senderMessageHandle(messageInput.trim());
					}}
					className="flex justify-center items-center gap-1 w-full p-1"
				>
					<InputComponent
						setState={setMessageInput}
						state={messageInput}
						placeholder="Digite sua mensagem"
						required={false}
						type="text"
					/>

					<ButtonComponent text="Enviar" type="submit" />
				</form>
			</section>
			{showAddChatOverlay && (
				<OverlayAddChat
					Users={usersFoundByEmail}
					showOverlay={setShowAddChatOverlay}
					setUsersFoundByEmail={setUsersFoundByEmail}
				/>
			)}
		</main>
	);
}

export { Chat };
