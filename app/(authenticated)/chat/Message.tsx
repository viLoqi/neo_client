import Image from 'next/image';
import moment from "moment";

import { MessageSchema } from "@/app/_types/main";

export default function Message({ author, content, authorPhotoURL, lastUpdated }: MessageSchema) {
    return (
        <div className="flex">
            {/* Avatar */}
            <div>
                <Image src={authorPhotoURL} width={50} height={50} alt="" className="flex h-6 w-6 rounded-full  mr-3" />
            </div>
            <div className="flex flex-col">
                {/* Username, dummy name for now */}
                <h1 className=" font-semibold">{author} <span className="text-xs font-semibold text-gray-500">{moment(lastUpdated.seconds * 1000).fromNow()}</span></h1>
                {/* Message,  */}
                <p className="break-all w-full">
                    {content}
                </p>
            </div>
        </div>
    );
};