"use client";

import { RepoDLState, checkRepoDL } from "@/lib/actions";
import { useFormState } from "react-dom";
import ReleaseItem from "@/ui/ReleaseItem";
import { useState, useEffect } from "react";
import RotatingEllipsis from "@/ui/RotatingEllipsis";

export default function Page() {
	const [loading, setLoading] = useState(false);

	const initialState: RepoDLState = { message: null };
	const [state, dispatch] = useFormState(checkRepoDL, initialState);

	const handleButtonPress = () => {
		setLoading(true);
	};

	useEffect(() => {
		if (state) {
			setLoading(false);
		}
	}, [state]);

	return (
		<div className="container mx-auto">
			<form action={dispatch}>
				<div className="flex items-center border-b-2 border-blue-500 py-2 bg-white shadow-md rounded-md focus-within:shadow-blue-400 hover:shadow-blue-400 transition-all duration-300 ease-in-out">
					<input
						name="repoLink"
						type="text"
						placeholder="Enter Github Repository link"
						className="rounded-l-md bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none transition-all duration-300 ease-in-out"
					/>
				</div>
				<div className="flex justify-center">
					<button
						type="submit"
						onClick={handleButtonPress}
						className={`bg-blue-500 text-white py-2 min-w-28 px-4 my-2 w-1/6 rounded-md hover:bg-blue-600 focus:outline-none transition-all duration-300 ease-in-out${
							loading ? "opacity-50 cursor-not-allowed" : ""
						}`}
						aria-disabled={loading}
					>
						{!loading ? (
							"Check Releases"
						) : (
							<div className="text-white">
								<RotatingEllipsis />
							</div>
						)}
					</button>
				</div>
				{/* Either show release details or show the error message */}
				<div className="flex item-center justify-center mt-4">
					{state.releases && !loading ? (
						<ReleaseItem
							releaseData={state.releases.releaseData}
							totalDL={state.releases.totalDownload}
							mostDownloaded={state.releases.mostDownloaded}
						/>
					) : (
						<div className="text-red-500">
							<p>{state.message}</p>
						</div>
					)}
				</div>
			</form>
		</div>
	);
}
