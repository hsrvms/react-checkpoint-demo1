import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate()
	function handleClick() {
    navigate('/')
  }

	return (
		<div className="flex flex-col justify-center w-full items-center min-h-screen bg-slate-800">
			<h1 className="text-5xl text-blue-100">
				Welcome to your Dashboard
			</h1>
			<button
				className="text-slate-100 border border-sky-400 rounded-lg p-2 hover:scale-105 mt-10"
				onClick={handleClick}
			>
				Log Out
			</button>
		</div>
	);
};

export default Dashboard;
