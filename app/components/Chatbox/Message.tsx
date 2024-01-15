import React from "react";

const Message = () => {
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                </p>
            </div>
        </div>
    );
};

export default Message;
