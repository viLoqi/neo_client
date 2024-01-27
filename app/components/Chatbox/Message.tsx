import React from "react";

const Message = ({ text }: { text: string }) => {
    return (
        <div className="flex mb-10">
            {/* Avatar */}
            <div>
                <div className="flex h-6 w-6 rounded-full bg-gray-400 mr-3"></div>
            </div>
            <div className="flex flex-col">
                {/* Username, dummy name for now */}
                <h1 className="text-white font-semibold">You</h1>
                {/* Message,  */}
                <p className="text-white ">
                    {text}
                </p>
            </div>
        </div>
    );
};

export default Message;
