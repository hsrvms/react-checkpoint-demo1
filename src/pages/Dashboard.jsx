import { useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { nanoid } from 'nanoid'


const Dashboard = () => {
	const navigate = useNavigate()
	const currentUser = JSON.parse(localStorage.getItem('currentUser'));
	const [note, setNote] = useState({ id: nanoid(), body: '' })
	const [allNotes, setAllNotes] = useState(JSON.parse(localStorage.getItem(`${currentUser.email}-notes`)) || []);

	function logOut() {
		const users = JSON.parse(localStorage.getItem('users'));
		const newUsers = users.map((user) => ({ ...user, isLoggedIn: false }))
		localStorage.setItem('users', JSON.stringify(newUsers))
		localStorage.setItem('currentUser', JSON.stringify({}))
		navigate('/')
	}

	useEffect(() => {
		localStorage.setItem(`${currentUser.email}-notes`, JSON.stringify(allNotes))
	}, [allNotes, currentUser.email])


	function addNote(e) {
		e.preventDefault()
		if (!note.body) return;

		setAllNotes(prevAllNotes => [note, ...prevAllNotes])
		setNote({ id: nanoid(), body: '' })
	}

	function handleChange(e) {
		const { value } = e.target;

		setNote(prevNote => ({ ...prevNote, body: value }))
	}

	function deleteNote(id) {
		setAllNotes(prevAllNotes => prevAllNotes.filter((note) => note.id !== id))
	}

	const noteElements = allNotes.map((note) => (
		<div
			key={note.id}
			className="flex justify-center items-center w-[32%] max-w-[270px] aspect-square bg-slate-300 rounded-xl p-4 text-center shadow-neutral-100 relative overflow-auto"
		>
			<p className="flex flex-wrap">{note.body}</p>
			<button
				className="w-12 text-red-500 text-xs p-1 border-red-500 border rounded-lg absolute bottom-2 right-2 hover:scale-105 transition-transform"
				onClick={() => deleteNote(note.id)}
			>
				Delete
			</button>
		</div>
	))

	return (
		<>
			{currentUser.isLoggedIn ? (
				<div className="flex flex-col w-full items-center min-h-screen bg-slate-800">
					<div className="flex items-center gap-4 w-full p-10">
						<h1 className="text-3xl text-blue-100 mr-auto sm:text-4xl md:text-5xl">
							Welcome {currentUser.name.toUpperCase()}
						</h1>
						<button
							className="button min-w-[75px]"
							onClick={logOut}
						>
							Log Out
						</button>
					</div>
					<form
						className="flex flex-col justify-center items-center gap-4 w-full p-4"
						onSubmit={addNote}
					>
						<textarea
							className="resize-none max-w-md w-full indent-1 p-4 rounded-sm bg-slate-100 shadow-lg"
							name="note"
							id="note"
							placeholder="Take a note..."
							value={note.body}
							onChange={handleChange}
						/>
						<button
							className="button"
						>
							Add Note
						</button>
					</form>

					<section className="flex justify-center flex-wrap w-full p-4 gap-4">
						{noteElements}
					</section>
				</div>
			) : (
				<>
					<h1 className="text-5xl text-center mt-10">You should be logged in.</h1>
					<Link to="/" className="text-xl text-center block mt-4 text-blue-900 hover:scale-110 transition-transform">Go to HomePage</Link>
				</>
			)}
		</>
	);
};

export default Dashboard;
