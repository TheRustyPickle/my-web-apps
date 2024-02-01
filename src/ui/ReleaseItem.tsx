// Import necessary types if needed
import { ReleaseData } from "@/lib/actions";

const ReleaseItem = ({
	releaseData,
	totalDL,
	mostDownloaded,
}: {
	releaseData: ReleaseData[];
	totalDL: number;
	mostDownloaded: ReleaseData | null;
}) => {
	return (
		<div className="w-3/5">
			{/* Top Component showing total download */}
			<div className="flex justify-center text-center text-gray-700">
				{/* Card for Total Downloads */}
				<div className="p-6 mx-4 w-1/2 bg-white rounded-lg shadow-md hover:shadow-blue-400 transition-all duration-300 ease-in-out flex flex-col justify-center items-center">
					<h2 className="text-xl font-bold mb-4">Total Downloads</h2>
					<p className="text-2xl">{`${totalDL.toLocaleString()}`}</p>
				</div>

				{/* Card for Most Downloaded */}
				{mostDownloaded && (
					<a
						href={mostDownloaded.releaseUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="p-6 mx-4 w-1/2 bg-white rounded-lg shadow-md hover:shadow-blue-400 transition-all duration-300 ease-in-out flex flex-col justify-center items-center"
					>
						<h2 className="text-xl font-bold mb-4">Most Downloaded</h2>
						<p className=" text-xl font-semibold mb-2">
							{mostDownloaded.releaseName}
						</p>
						<p>{`Downloaded ${mostDownloaded.releaseDownload.toLocaleString()} Times`}</p>
					</a>
				)}
			</div>

			{releaseData.map((release, index) => (
				// Open a new tab on component click
				<a
					key={`release_${index}`}
					href={release.releaseUrl}
					target="_blank"
					rel="noopener noreferrer"
				>
					{/* Each release component */}
					<div className="text-gray-700 m-4 p-6 bg-white rounded-lg shadow-md cursor-pointer hover:shadow-blue-400 transition-all duration-300 ease-in-out">
						<h2 className="text-xl font-bold mb-4">{release.releaseName}</h2>
						<p>
							Published at: {new Date(release.publishedAt).toLocaleDateString()}
						</p>
						<p className="mb-2">Release Downloads: {release.releaseDownload}</p>
						{/* List of assets in a release */}
						<ul>
							{release.releaseAssets.map((asset, assetIndex) => (
								<li
									key={`asset_${assetIndex}`}
									className="flex justify-between items-center"
								>
									<span>{asset.assetName}</span>
									<span>{asset.downloadCount} downloads</span>
								</li>
							))}
						</ul>
					</div>
				</a>
			))}
		</div>
	);
};

export default ReleaseItem;
