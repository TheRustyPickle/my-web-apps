"use client";

import { checkLink } from "@/lib/actions";
import LinkItem from "@/ui/LinkItem";
import RotatingEllipsis from "@/ui/RotatingEllipsis";
import TimerConfig from "@/ui/TimerConfig";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { State } from "@/lib/actions";

export default function Page() {
	const [loading, setLoading] = useState(false);
	const [showConfig, setShowConfig] = useState(false);
	const [waitTime, setWaitTime] = useState(2);
	const [navigationTime, setNavigationTime] = useState(30);

	const initialState: State = { message: null };
	let [state, dispatch] = useFormState(checkLink, initialState);

	// On button submit show the processing message + remove the previous error message
	const handleButtonPress = () => {
		state = { message: null };
		setLoading(true);
	};

	// If state changes, remove loading. If valid error message then show the dropdown selector
	useEffect(() => {
		setLoading(false);
		if (state.message && state.message !== "Link cannot be empty.") {
			setShowConfig(true);
		}
	}, [state]);

	// If loading status changes to true, wait 10ms before removing the dropdown selector
	// without waiting, server side considers the dropdown was invisible and gives null value
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			if (loading) {
				setShowConfig(false);
			}
		}, 10);

		return () => clearTimeout(timeoutId);
	}, [loading]);

	return (
		<div className="container mx-auto mt-10">
			<form action={dispatch}>
				<div className="flex flex-auto flex-row">
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
				</div>
				{/* Loading message */}
				<div>
					{loading ? (
						<div className="loading-container">
							<RotatingEllipsis />
						</div>
					) : null}
				</div>
				<div>
					{/* Error message */}
					<div
						className="text-sm text-red-500"
						aria-live="polite"
						aria-atomic="true"
					>
						{state.message && !loading ? (
							<>
								<p className="my-2">{state.message}</p>
							</>
						) : null}
					</div>
					{/* Puppeteer config selection */}
					<div>
						{showConfig ? (
							<TimerConfig
								waitTime={waitTime}
								setWaitTime={setWaitTime}
								navigationTime={navigationTime}
								setNavigationTime={setNavigationTime}
							/>
						) : null}
					</div>
				</div>
			</form>
			{/* Downloadable list */}
			{state.parsedDownloadables && !loading ? (
				<LinkItem
					fullLinks={state.parsedDownloadables.fullLinks}
					partialLinks={state.parsedDownloadables.partialLinks}
				/>
			) : null}
		</div>
	);
}
