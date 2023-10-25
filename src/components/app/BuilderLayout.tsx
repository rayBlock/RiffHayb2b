export const BuilderLayout = (props: {
	//
	title?: string;
	children: React.ReactNode;
}) => {
	return (
		<div className=" px-0 md:px-2 lg:px-4 ">
			{props.title && <h3 className="text-2xl max-h-screen font-bold">{props.title}</h3>}
			{props.children}
		</div>
	);
};
