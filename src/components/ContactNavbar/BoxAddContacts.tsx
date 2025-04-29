function AddContacts() {
    return (
        <form className="bg-zinc-800 w-96 h-44 z-50 flex flex-col gap-2 pt-6 justify-center items-center fixed top-3 left-1/2 rounded-md shadow-2xl" style={{ left: '50%', transform: 'translateX(-50%)' }}>
            <p className="absolute top-1">Adicionar um contato</p>
            <input className="text-center border-1 rounded-md p-1" type="text" placeholder="Email do usuário" />
            <input className="text-center border-1 rounded-md p-1" type="text" placeholder="Apelido que deseja"/>
            <button type="submit" className="bg-zinc-500 rounded-md p-1 hover:cursor-pointer hover:bg-white/20">Adicionar</button>
        </form>
    )
}

export {AddContacts}