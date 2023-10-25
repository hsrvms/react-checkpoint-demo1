import { useState } from "react";
import {Navigate} from "react-router-dom";

import Button from "./components/Button";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  // const navigate = useNavigate();
  // console.log(navigate)
	const [isNewUser, setIsNewUser] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	function resetFormData() {
		setFormData({
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		});
	}

	console.log(isLoggedIn);
	function handleChange(event) {
		const { name, value } = event.target;

		setFormData((prevData) => ({ ...prevData, [name]: value }));
	}

	function handleSubmit(event) {
		event.preventDefault();
		const formType = event.target.dataset.type;
		console.log(formType);

		const users = JSON.parse(localStorage.getItem("users")) || [];

		if (formType === "register") {
			const filtered = users.filter(
				(user) => user.email == formData.email
			);
			if (filtered.length > 0) {
				console.error("This email has allready been taken");
				return;
			}
			users.push(formData);
			localStorage.setItem("users", JSON.stringify(users));
			setIsLoggedIn(true);
			resetFormData();
			return;
		}

		if (users.length === 0) return;

		const filtered = users.filter((user) => user.email === formData.email);
		if (filtered[0].password !== formData.password) {
			console.error("The password you entered is wrong");
			return;
		}
		setIsLoggedIn(true);
		resetFormData();
	}

	function handleFormTypeClick() {
		setIsNewUser((prevIsNewUser) => !prevIsNewUser);
	}

	return (
		<div className="flex flex-col justify-center w-full items-center min-h-screen bg-slate-800">
			<h1 className="text-5xl text-blue-100 mb-8">Welcome Guest</h1>
			<div className="flex gap-4 p-4 ">
				<Button
					title="Login"
					name="loginBtn"
					isDisabled={!isNewUser}
					handleClick={handleFormTypeClick}
				/>
				<Button
					title="Register"
					name="registerBtn"
					isDisabled={isNewUser}
					handleClick={handleFormTypeClick}
				/>
			</div>

			{!isNewUser ? (
				<Login
					isLoggedIn={isLoggedIn}
					formData={formData}
					handleChange={handleChange}
					handleSubmit={handleSubmit}
				/>
			) : (
				<Register
					isLoggedIn={isLoggedIn}
					formData={formData}
					handleChange={handleChange}
					handleSubmit={handleSubmit}
				/>
			)}

			{isLoggedIn && (
        <Navigate to="/dashboard"/>
      )}

      {/* <Dashboard handleLogout={handleLogout} /> */}
		</div>
	);
}

export default App;
