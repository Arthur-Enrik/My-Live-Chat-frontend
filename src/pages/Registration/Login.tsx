import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../utils/fetch.utils";
import { TOKEN } from "../../utils/token.utils";

import { ButtonComponent } from "../../components/Forms/Button";
import { InputComponent } from "../../components/Forms/Input";
import { Notify } from "../UtilsPages/Notification";

// Icons
import { Mail, Lock } from "lucide-react";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");

	const [showNotify, setShowNotify] = useState(false);
	const [notifyType, setNotifyType] = useState<"MSG" | "WARN" | "ERR">("MSG");
	const [notifyMessage, setNotifyMessage] = useState<string>("");

	const navigate = useNavigate();

	async function submitForm(event: FormEvent) {
		event.preventDefault();

		setPasswordError("");
		setEmailError("");

		const [res, data] = await API.post<{
			message: string;
			success: boolean;
			token: string;
			errors: Array<{ field: string; message: string }>;
		}>("/users/auth", {
			email,
			password,
		});

		if (!res.ok || !data.success) {
			formErrorHandle(data.errors);
			return;
		}

		TOKEN.set(data.token);
		notifyHandler(data.message, "MSG", 3000);

		setTimeout(() => {
			navigate("/chat");
		}, 3000);
	}

	function notifyHandler(message: string, type: "MSG" | "ERR" | "WARN", duration: number = 1000) {
		setNotifyMessage(message);
		setNotifyType(type);
		setShowNotify(true);

		setTimeout(() => {
			setShowNotify(false);
		}, duration);
	}

	function formErrorHandle(errors: Array<{ field: string; message: string }>) {
		if (!Array.isArray(errors)) {
			notifyHandler("Ocorreu um erro inesperado", "ERR", 2000);
		}
		errors.forEach((error) => {
			switch (error.field) {
				case "email":
					setEmailError(error.message);
					break;
				case "password":
					setPasswordError(error.message);
					break;
				default:
					notifyHandler("Ocorreu um erro no servidor, tente novamente mais tarde", "ERR", 2000);
					break;
			}
		});
	}

	return (
		<main className="bg-zinc-700 flex flex-col items-center w-fit h-fit min-w-3xl p-4 pb-1 rounded-md shadow-md border-1 border-purple-500/5">
			<h2 className="text-zinc-200 text-center font-bold p-2">
				Digite suas informações para entrar em sua conta
			</h2>
			<form
				onSubmit={submitForm}
				className="w-3/4 h-2/4 mt-10 flex-col flex justify-center items-center gap-5"
			>
				<div className="w-full h-10">
					<InputComponent
						state={email}
						setState={setEmail}
						placeholder="Digite seu email"
						required={true}
						type="email"
						icon={<Mail />}
					/>
					{emailError && (
						<span className="text-red-700 w-full h-8 p-1 font-bold"> {emailError} </span>
					)}
				</div>
				<div className="w-full h-10 mb-5">
					<InputComponent
						state={password}
						setState={setPassword}
						placeholder="Digite sua senha"
						required={true}
						type="password"
						icon={<Lock />}
					/>
					{passwordError && (
						<span className="text-red-700 w-full h-8 p-1 font-bold"> {passwordError} </span>
					)}
				</div>
				<ButtonComponent type="submit" text="Entrar" />
			</form>
			<p className="text-zinc-200 p-2 mt-10">
				Caso não tenha uma{" "}
				<Link to={"/register"}>
					<strong>clique aqui!</strong>
				</Link>
			</p>
			{showNotify && <Notify type={notifyType} message={notifyMessage} />}
		</main>
	);
}

export { Login };
