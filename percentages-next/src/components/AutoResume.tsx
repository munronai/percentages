"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "../lib/session";

export default function AutoResume() {
    const router = useRouter();

    useEffect(() => {
        // Run once on mount to check for an existing session
        const session = getSession();
        if (session) {
            router.push('/game/solo');
        }
    }, [router]);

    // This component renders nothing, it just handles the side-effect
    return null;
}
