import { useState } from "react";

// TODO: parse email to get the school name
const useSchool = () => {
    const [school, setSchool] = useState("stonybrook")
    return school;
}

export default useSchool;