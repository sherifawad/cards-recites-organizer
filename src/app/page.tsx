"use client";
import UploadFiles from "@/components/uploadFiles";

export default function Home() {
	return (
		<section className='container'>
			Home
			<UploadFiles saveAfterUpload={() => new Promise(() => undefined)} />
		</section>
	);
}
