// OptionsComponent.js
import React, { Dispatch, SetStateAction, useState } from "react";

const TimerConfig = ({
	waitTime,
	setWaitTime,
	navigationTime,
	setNavigationTime,
}: {
	waitTime: number;
	setWaitTime: Dispatch<SetStateAction<number>>;
	navigationTime: number;
	setNavigationTime: Dispatch<SetStateAction<number>>;
}) => {
	return (
		<div id="custom-options" className="mt-2">
			<p className="text-sm text-red-500">
				Try modifying wait/navigation timer if it persist:
			</p>
			<div className="flex mt-2">
				<label className="mr-2">Wait Time:</label>

				<select
					value={waitTime}
					name="waitTime"
					onChange={(e) => {
						setWaitTime(parseInt(e.target.value));
					}}
				>
					<option value={2}>2 seconds</option>
					<option value={5}>5 seconds</option>
					<option value={10}>10 seconds</option>
					<option value={15}>15 seconds</option>
				</select>
			</div>
			<div className="flex mt-2">
				<label className="mr-2">Navigation Time:</label>
				<select
					value={navigationTime}
					name="navigationTime"
					onChange={(e) => {
						setNavigationTime(parseInt(e.target.value));
					}}
				>
					<option value={30}>30 seconds</option>
					<option value={60}>60 seconds</option>
					<option value={100}>100 seconds</option>
					<option value={150}>150 seconds</option>
				</select>
			</div>
		</div>
	);
};

export default TimerConfig;
