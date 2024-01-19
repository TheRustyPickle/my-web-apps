import { truncateLink } from "@/lib/utils";

const LinkItem = ({
  fullLinks,
	parsedLinks,
}: {
	fullLinks: string[];
  parsedLinks: string[];
}) => {

	return (
		<div className="my-4">
			{fullLinks.length > 0 ? (
				<div className="">
					{fullLinks.map((link, index) => (
						<div key={`list_${index}`} className="">
							<div className="flex justify-center" style={{ padding: '6px'}}>
								<a
									href={link}
									className="text-white bg-blue-500 hover:bg-blue-600 rounded-full border border-blue-500 hover:border-blue-600 transition-all duration-300 ease-in-out p-2 "
                  
                  style={{ width: '800px', textAlign: 'center' }}
                  download={link}
                >
									{`${parsedLinks[index]}`}
								</a>
							</div>
						</div>
					))}
				</div>
			) : (
				<p className="text-gray-500">No downloadables found.</p>
			)}
		</div>
	);
};

export default LinkItem;
