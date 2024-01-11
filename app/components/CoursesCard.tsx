import React, { MouseEventHandler } from "react";

const CoursesCard = ({
    course,
    onClick,
}: {
    course: String;
    onClick: MouseEventHandler<HTMLButtonElement>;
}) => {
    return (
        <button onClick={onClick} className="flex w-full h-[72px] items-center bg-[#206f4c] rounded-xl border-t-[1px] border-b-[1px] border-[#003825] font-bold text-lg text-white">
            {/* Course avatar */}
            <div className="size-10 bg-gray-200 rounded-full mx-5" />
            {course}
        </button>
    );
};

export default CoursesCard;
