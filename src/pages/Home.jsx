import { useState } from 'react'
import { useNavigate } from "react-router-dom";


import Login from '../components/Login';
import Button from '../components/Button';
import Register from '../components/Register';

const Home = () => {

  const navigate = useNavigate();
  const [isNewUser, setIsNewUser] = useState(false);
  const [formData, setFormData] = useState(emptyFormData());


  function emptyFormData() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      isLoggedIn: false
    }
  }

  function resetFormData() {
    setFormData(emptyFormData());
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formType = event.target.dataset.type;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    //! REGISTER
    if (formType === "register") {
      const isExist = users.some(
        (user) => user.email == formData.email
      );
      if (isExist) {
        console.error("This email has already been taken");
        resetFormData();
        return;
      }
      const currentUser = {...formData, isLoggedIn: true}
      users.push(currentUser);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(currentUser))
      resetFormData();
      navigate('/dashboard')
      return;
    }

    //! LOGIN
    if (users.length === 0) {
      console.error('There is no such user')
      resetFormData();
      return;
    }

    const existingUser = users.find((user) => user.email === formData.email);
    if (!existingUser) {
      console.error('There is no such user');
      resetFormData();
      return;
    }
    if (existingUser.password !== formData.password) {
      console.error("The password you entered is wrong");
      resetFormData();
      return;
    }

    existingUser.isLoggedIn = true;
    localStorage.setItem('users', JSON.stringify(users))
    localStorage.setItem('currentUser', JSON.stringify(existingUser))
    navigate('/dashboard')
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
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      ) : (
        <Register
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  )
}

export default Home;