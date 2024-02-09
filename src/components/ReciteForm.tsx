"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FieldError, useForm } from "react-hook-form";
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
import DatePicker from "./DatePicker";
import MemberShipInput from "./memberShip-input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import UploadFiles from "./uploadFiles";

export const formatErrors = (errors: Record<string, FieldError>) =>
	Object.keys(errors).map(key => ({
		key,
		message: errors[key].message,
	}));

const formSchema = z
	.object({
		note: z.string().min(2),
		images: z.array(z.string()),
		tags: z.array(z.string()),
		date: z.date(),
		memberShip: z.boolean().optional(),
		code: z.string().min(4).optional(),
	})
	.refine(
		data => {
			if (data.memberShip) {
				return data.code ? true : false;
			}
			return true;
		},
		{
			message: "Switch is On and MemberShip Code Not Exist",
			path: ["code"],
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
	const switchState = form.watch("memberShip");
	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log("🚀 ~ onSubmit ~ values:", values);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<FormField
					control={form.control}
					name='note'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Note</FormLabel>
							<FormControl>
								<Input placeholder='shadcn' {...field} />
							</FormControl>
							<FormDescription>Add any desired Notes</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='date'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Recite Date</FormLabel>
							<FormControl>
								<DatePicker
									onDateSelect={field.onChange}
									selectedDate={field.value}
								/>
							</FormControl>
							<FormDescription>Select Data Day</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className='flex flex-row items-center justify-between rounded-lg border p-4'>
					<div className='space-y-0.5'>
						<Label className='text-base'>Add MemberShip</Label>
						<FormField
							control={form.control}
							name='code'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<MemberShipInput
											onChange={field.onChange}
											value={field.value}
											isDisabled={!switchState}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name='memberShip'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Switch
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name='images'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Recites Images</FormLabel>
							<FormControl>
								<UploadFiles
									onUploadComplete={() => new Promise(() => undefined)}
									onError={() => new Promise(() => undefined)}
								/>
							</FormControl>
							<FormDescription>
								Select a Single or Multiple Images to be uploaded
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					className='disable:bg-mute-500'
					type='submit'
					disabled={form.formState.isSubmitting}
				>
					Submit
				</Button>
			</form>
			<pre>
				{JSON.stringify(formatErrors(form.formState.errors as any), null, 2)}
			</pre>
		</Form>
	);
}

export default ReciteForm;
