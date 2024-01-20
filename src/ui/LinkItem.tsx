const LinkItem = ({
	fullLinks,
	partialLinks,
}: {
	fullLinks: string[];
	partialLinks: string[];
}) => {
	return (
		<div className="my-4">
			{fullLinks.length > 0 ? (
				fullLinks.map((link, index) => (
					<div
						key={`list_${index}`}
						className="flex justify-center items-center py-1.5"
					>
						<a
							href={link}
							target="_blank"
							rel="noopener noreferrer"
							className="text-center text-white bg-blue-500 hover:bg-blue-600 rounded-full border border-blue-500 hover:border-blue-600 transition-all duration-300 ease-in-out p-2 w-1/2"
						>
							{`${partialLinks[index]}`}
						</a>
					</div>
				))
			) : (
				<p className="text-gray-500">No downloadables found.</p>
			)}
		</div>
	);
};

export default LinkItem;
