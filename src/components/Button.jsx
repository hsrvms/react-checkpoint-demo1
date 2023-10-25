const Button = ({ title, isDisabled, handleClick,name }) => {
	return (
		<button
			className="text-slate-100 border border-sky-400 rounded-lg p-2 disabled:bg-sky-400 disabled:border-white"
			disabled={isDisabled}
      onClick={handleClick}
      name={name}
		>
			{title}
		</button>
	);
};

export default Button;
