"use client";

import { getImageUrl } from "@/lib/utils";
import { UploadButton, UploadFileResponse } from "@xixixao/uploadstuff/react";
import "@xixixao/uploadstuff/react/styles.css";
import { useMutation } from "convex/react";
import Image from "next/image";
import { useState } from "react";
import { api } from "../../convex/_generated/api";

interface UploadFilesProps {
	saveAfterUpload: (uploaded: UploadFileResponse[]) => Promise<void>;
}

function UploadFiles({ saveAfterUpload }: UploadFilesProps) {
	const generateUploadUrl = useMutation(api.files.generateUploadUrl);
	const [images, setImages] = useState<string[]>([]);

	const saveFiles = async (uploaded: UploadFileResponse[]) => {
		setImages(uploaded.map(({ response }) => (response as any).storageId));
	};

	// const result = await fetch(postUrl, {
	// 	method: "POST",
	// 	headers: { "Content-Type": selectedImage!.type },
	// 	body: selectedImage,
	// });
	// const { storageId } = await result.json();

	return (
		<section>
			{images.length > 0 ? (
				<ul className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
					{images.map(img => (
						<li key={img}>
							<Image
								alt=''
								width={200}
								height={200}
								className='w-full'
								src={getImageUrl(img)}
							/>
						</li>
					))}
				</ul>
			) : (
				<UploadButton
					uploadUrl={generateUploadUrl}
					fileTypes={["image/*"]}
					multiple
					onUploadComplete={saveFiles}
					onUploadError={(error: unknown) => {
						// Do something with the error.
						alert(`ERROR! ${error}`);
					}}
				/>
			)}
		</section>
	);
}

export default UploadFiles;
