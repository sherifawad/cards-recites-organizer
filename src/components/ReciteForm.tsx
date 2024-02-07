"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import UploadFiles from "./uploadFiles";

const formSchema = z
	.object({
		note: z.string().min(2),
		images: z.array(z.string()).nonempty(),
		tags: z.array(z.string()).nonempty(),
		date: z.date(),
		code: z.number().optional(),
		year: z.number().optional(),
	})
	.refine(
		data => {
			if (data.code && !data.year) {
				return false;
			}
			if (data.year && !data.code) {
				return false;
			}
		},
		{
			message: "year and code must both exist",
			path: ["year", "code"],
		},
	);

function ReciteForm() {
	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			images: [],
			note: "",
			tags: [],
			date: new Date(),
		},
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<FormField
					control={form.control}
					name='note'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input placeholder='shadcn' {...field} />
							</FormControl>
							<FormDescription>
								This is your public display name.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='images'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<UploadFiles
									onUploadComplete={() => new Promise(() => undefined)}
									onError={() => new Promise(() => undefined)}
								/>
							</FormControl>
							<FormDescription>
								This is your public display name.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit'>Submit</Button>
			</form>
		</Form>
	);
}

export default ReciteForm;
