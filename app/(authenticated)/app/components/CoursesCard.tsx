import Link from "next/link";

const CoursesCard = ({
    course,
    link
}: {
    course: string; link: string
}) => {
    return (
        <Link href={link} className="flex w-full items-center rounded-xl  py-2 pr-2">
            {course}
        </Link>
    );
};

export default CoursesCard;
