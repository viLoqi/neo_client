import React from "react";
import { MessageSchema } from "@/app/types";
import moment from "moment";

const Message = ({ author, content, authorPhotoURL, lastUpdated }: MessageSchema) => {
    return (
        <div className="flex mb-10">
            {/* Avatar */}
            <div>
                <img src={authorPhotoURL} className="flex h-6 w-6 rounded-full bg-gray-400 mr-3" />
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

export default Message;
