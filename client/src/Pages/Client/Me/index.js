import { useEffect } from "react";

export default function Me() {
    useEffect(() => {
        async function get() {
            const response = await fetch("http://localhost:7002/client/me");
            const data = await response.json();

            console.log(data);
        }
    }, []);

    return <h1>Hei</h1>;
}
