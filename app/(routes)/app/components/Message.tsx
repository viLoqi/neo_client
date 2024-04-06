import Image from 'next/image';
import moment from "moment";

import { MessageSchema } from "@/app/_types/main";

export default function Message({ author, content, authorPhotoURL, lastUpdated }: MessageSchema) {
    return (

        // ...

        <div className="flex mb-10">
            {/* Avatar */}
            <div>
                <Image src={authorPhotoURL} width={50} height={50} alt="" className="flex h-6 w-6 rounded-full bg-gray-400 mr-3" />
            </div>
            <div className="flex flex-col">
                {/* Username, dummy name for now */}
                <h1 className="text-white font-semibold">{author} <span>{moment(lastUpdated.seconds * 1000).fromNow()}</span></h1>
                {/* Message,  */}
                <p className="text-white ">
                    {content}
                </p>
            </div>
        </div>
    );
};