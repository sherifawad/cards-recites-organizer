"use client";

import { useEffect, useState } from "react";
import { Input } from "./ui/input";

type Props = {
	value: string | undefined;
	onChange: (value: string | undefined) => void;
	isDisabled: boolean;
};

function MemberShipInput({ value, onChange, isDisabled }: Props) {
	const memberShipValue = value?.split("-");

	const [code, setCode] = useState<string | undefined>(
		memberShipValue ? memberShipValue[0] : undefined,
	);
	const [year, setYear] = useState<string | undefined>(
		memberShipValue ? memberShipValue[1] : undefined,
	);

	useEffect(() => {
		if (isDisabled) {
			setCode(undefined);
			setYear(undefined);
			onChange(undefined);
		} else {
			if (code && year && code.length > 0 && year.length > 0) {
				const memberShip = `${code}-${year}`;
				onChange(memberShip);
			}
		}
	}, [code, onChange, year, isDisabled]);

	return (
		<div className='flex items-center gap-x-3'>
			<Input
				placeholder='code'
				type='number'
				value={code || ""}
				onChange={e => setCode(e.target.value)}
				disabled={isDisabled}
			/>
			<Input
				placeholder='year'
				type='number'
				value={year || ""}
				onChange={e => setYear(e.target.value)}
				disabled={isDisabled}
			/>
		</div>
	);
}

export default MemberShipInput;
