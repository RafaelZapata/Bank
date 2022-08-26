import { useEffect } from "react";
import { me } from "utilities/api/client";

export default function Home() {
    useEffect(() => {
        // me();
    }, []);

    return <h1>Home</h1>;
}
