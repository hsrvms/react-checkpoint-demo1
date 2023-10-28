
const Login = ({formData, handleChange, handleSubmit }) => {
	return (
		<form className="flex flex-col gap-2" onSubmit={handleSubmit} data-type="login">
			<input
				type="email"
				name="email"
				placeholder="Email"
				required
				className="indent-3 p-2 rounded-lg"
        onChange={handleChange}
        value={formData.email}
			/>
			<input
				type="password"
				name="password"
				placeholder="Password"
				required
				className="indent-3 p-2 rounded-lg"
        onChange={handleChange}
        value={formData.password}
			/>
			
			<button className="text-slate-100 border border-sky-400 rounded-lg p-2 hover:scale-105">Submit</button>
		</form>
	);
};

export default Login;
