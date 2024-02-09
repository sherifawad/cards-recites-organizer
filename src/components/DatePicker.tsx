"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type DatePickerProps = {
	selectedDate: Date | undefined;
	onDateSelect: (dateValue: Date | undefined) => void;
};

function DatePicker({ selectedDate, onDateSelect }: DatePickerProps) {
	const [open, setOpen] = React.useState<boolean>(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					className={cn(
						"w-full justify-start text-left font-normal",
						!selectedDate && "text-muted-foreground",
					)}
				>
					<CalendarIcon className='mr-2 h-4 w-4' />
					{selectedDate ? (
						format(selectedDate, "PPP")
					) : (
						<span>Pick a Date</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-auto p-0'>
				<Calendar
					mode='single'
					selected={selectedDate}
					onSelect={d => {
						onDateSelect(d);
						setOpen(false);
					}}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
}

export default DatePicker;
