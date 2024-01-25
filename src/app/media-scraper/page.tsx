"use client";

import { checkLink } from "@/lib/actions";
import LinkItem from "@/ui/LinkItem";
import RotatingEllipsis from "@/ui/RotatingEllipsis";
import TimerConfig from "@/ui/TimerConfig";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { ParserState } from "@/lib/actions";

export default function Page() {
	const [loading, setLoading] = useState(false);
	const [showConfig, setShowConfig] = useState(false);
	const [waitTime, setWaitTime] = useState(2);
	const [navigationTime, setNavigationTime] = useState(30);
	const [errorCount, setErrorCount] = useState(0);

	const initialState: ParserState = { message: null };
	const [state, dispatch] = useFormState(checkLink, initialState);

	// On button submit show the processing message + remove the previous error message
	const handleButtonPress = () => {
		setLoading(true);
	};

	// If state changes, remove loading. If valid error message then show the dropdown selector
	useEffect(() => {
		setLoading(false);

		// Show up the config if failed to get content 2 times in a row
		if (state.message) {
			// Empty link/input form will not be considered
			if (state.message !== "Link cannot be empty.") {
				setErrorCount((count) => {
					const new_val = count + 1;
					if (new_val >= 2) {
						setShowConfig(true);
					}
					return new_val;
				});
			}
		} else {
			setErrorCount(0);
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
		<div className="container mx-auto">
			<form action={dispatch}>
				<div className="flex flex-auto flex-row">
					<input
						name="linkToCheck"
						type="text"
						placeholder="Enter a website link"
						className="border p-2 rounded-l-md w-full focus:outline-none hover:border-blue-500 hover:border-1 focus:border-1 focus:border-blue-500 transition-all duration-300 ease-in-out"
					/>
					<button
						type="submit"
						className={`bg-blue-500 text-white p-2 w-1/12 min-w-20 rounded-r-md hover:bg-blue-600 focus:outline-none transition-all duration-300 ease-in-out ${
							loading ? "opacity-50 cursor-not-allowed" : ""
						}`}
						onClick={handleButtonPress}
						aria-disabled={loading}
					>
						Check
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
