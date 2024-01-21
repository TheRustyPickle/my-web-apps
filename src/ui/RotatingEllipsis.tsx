import React, { useState, useEffect, useMemo } from "react";

const RotatingEllipsis = () => {
	const [loadingText, setLoadingText] = useState("Processing");
	const [ellipsisPosition, setEllipsisPosition] = useState(0);

	const ellipsis = useMemo(() => ["", ".", "..", "..."], []);

	useEffect(() => {
		const interval = setInterval(() => {
			setEllipsisPosition(
				(prevPosition) => (prevPosition + 1) % ellipsis.length,
			);
		}, 100);

		return () => clearInterval(interval);
	}, [ellipsis]);

	useEffect(() => {
		setLoadingText(`Processing${ellipsis[ellipsisPosition]}`);
	}, [ellipsisPosition, ellipsis]);

	return <p className="text-blue-500 font-semibold">{loadingText}</p>;
};

export default RotatingEllipsis;
