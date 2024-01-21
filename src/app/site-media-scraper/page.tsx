"use client";

import { checkLink } from "@/lib/actions";
import LinkItem from "@/ui/LinkItem";
import RotatingEllipsis from "@/ui/RotatingEllipsis";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";

export default function Page() {
	const initialState = { error: {}, message: null };
	let [state, dispatch] = useFormState(checkLink, initialState);
	const [loading, setLoading] = useState(false);

	const handleButtonPress = () => {
		state = { message: null };
		setLoading(true);
	};

	useEffect(() => {
		if (state) {
			setLoading(false);
		}
	}, [state]);

	return (
		<div className="container mx-auto mt-10">
			<form action={dispatch} className="flex">
				<input
					name="linkToCheck"
					type="text"
					placeholder="Enter your link"
					className="border p-2 rounded-l-md w-full focus:outline-none"
				/>
				<button
					type="submit"
					className={`bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 focus:outline-none ${
						loading ? "opacity-50 cursor-not-allowed" : ""
					}`}
					onClick={handleButtonPress}
					aria-disabled={loading}
				>
					Submit
				</button>
			</form>
			<div id="custom-error" aria-live="polite" aria-atomic="true">
				{state.message && !loading ? (
					<p className="mt-2 text-sm text-red-500">{state.message}</p>
				) : null}
			</div>
			{loading ? (
        <div className="loading-container">
          <RotatingEllipsis />
        </div>
      ) : null}
			{state.parsedDownloadables && !loading ? (
				<LinkItem
					fullLinks={state.parsedDownloadables.fullLinks}
					partialLinks={state.parsedDownloadables.partialLinks}
				/>
			) : null}
		</div>
	);
}
