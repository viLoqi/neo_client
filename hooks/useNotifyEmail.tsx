import { NotifyEmailBody } from "@/app/_types/main";
import { useState } from "react";

const useNotifyEmail = () => {
    const [loading] = useState(false)

    const notify = (body: NotifyEmailBody) => {
        fetch("https://si0brqvaq9.execute-api.us-east-1.amazonaws.com/production/email", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    }

    return { loading, notify }
}

export default useNotifyEmail;