
const Register = ({ formData, handleChange, handleSubmit }) => {

	return (
		<form className="flex flex-col gap-2" onSubmit={handleSubmit} data-type="register">
			<input
				type="text"
				name="name"
				placeholder="Name"
				required
				className="indent-3 p-2 rounded-lg"
				onChange={handleChange}
				value={formData.name}
			/>
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
			<input
				type="password"
				name="confirmPassword"
				placeholder="Confirm Password"
				required
				className="indent-3 p-2 rounded-lg"
				onChange={handleChange}
				value={formData.confirmPassword}
			/>
			<button className="text-slate-100 border border-sky-400 rounded-lg p-2 hover:scale-105">Submit</button>
		</form>
	);
};

export default Register;
