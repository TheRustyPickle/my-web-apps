"use client";

import { checkLink } from "@/lib/actions";
import LinkItem from "@/ui/LinkItem";
import React, { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

export default function Home() {
	const initialState = { error: {}, message: null };
	let [state, dispatch] = useFormState(checkLink, initialState);
	const [loading, setLoading] = useState(false);

	const handleButtonPress = () => {
		state = { error: {}, message: null };
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
					className={
						"bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 focus:outline-none"
					}
					onClick={handleButtonPress}
				>
					Submit
				</button>
			</form>
			<div id="custom-error" aria-live="polite" aria-atomic="true">
				{state.message && !loading ? (
					<p className="mt-2 text-sm text-red-500">{state.message}</p>
				) : null}
				{state.error?.link?.map(
					(error: string) =>
						!loading && (
							<p className="mt-2 text-sm text-red-500" key={error}>
								{error}
							</p>
						),
				)}
			</div>
			{loading ? (
				<div className="loading-container">
					<p className="text-blue-500 font-semibold">Processing...</p>
				</div>
			) : null}
			{state.parsedDownloadables && !loading ? (
				<LinkItem
					fullLinks={state.parsedDownloadables.fullLinks}
					parsedLinks={state.parsedDownloadables.parsedLinks}
				/>
			) : null}
		</div>
	);
}