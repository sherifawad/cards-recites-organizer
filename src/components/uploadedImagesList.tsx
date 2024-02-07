import { getImageUrl } from "@/lib/utils";
import Image from "next/image";

type Props = {
	imagesUrls: string[];
};

const UploadedImagesList = ({ imagesUrls }: Props) => {
	return (
		<ul className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
			{imagesUrls.map(img => (
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
	);
};

export default UploadedImagesList;
