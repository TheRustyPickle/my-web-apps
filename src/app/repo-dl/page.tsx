"use client";

import { RepoDLState, checkRepoDL } from "@/lib/actions";
import { useFormState } from "react-dom";

export default function Page() {
	const initialState: RepoDLState = { message: null };

	const [state, dispatch] = useFormState(checkRepoDL, initialState);

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
						className="bg-blue-500 text-white py-2 px-4 my-2 w-1/6 min-w-20 rounded-md hover:bg-blue-600 focus:outline-none transition-all duration-300 ease-in-out"
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
}
