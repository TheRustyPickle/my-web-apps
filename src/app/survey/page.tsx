"use client";

import Link from "next/link";

export default function Page() {
	return (
		<div className="flex h-screen justify-center items-center space-x-4">
			<Link
				className="btn btn-md bg-blue-500 hover:bg-blue-600 text-white"
				href="/survey/create"
			>
				Create New Survey
			</Link>
			<Link
				className="btn btn-md bg-blue-500 hover:bg-blue-600 text-white"
				href="/survey/check"
			>
				Check Existing Survey
			</Link>
		</div>
	);
}
