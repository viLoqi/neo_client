import { Avatar } from "@chakra-ui/react";
import { MouseEventHandler } from "react";

const CoursesCard = ({
    course,
    onClick,
}: {
    course: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
}) => {
    return (
        <button onClick={onClick} className="flex w-full items-center rounded-xl  py-2 pr-2">
            {course}
        </button>
    );
};

export default CoursesCard;
