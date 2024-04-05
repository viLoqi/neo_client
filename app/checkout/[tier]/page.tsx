"use client"
import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from 'next/navigation';
import Link from "next/link";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase"

import { loadStripe } from '@stripe/stripe-js';
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout
} from '@stripe/react-stripe-js';

// This is your test public API key.
const stripePromise = loadStripe("pk_test_51Og0zkHuYFk3KBjS4oyz1GwCxTO1MuCVAA7TN3lPtiRus703fNvKgpIBlZaiC8KjwNXoGkAaH7tQC5mbhzuFBJKW00ScJ4whgG");

const Checkout = () => {
    // from the url: /checkout/:tier
    const { tier } = useParams();
    const { push } = useRouter();

    // if not a valid tier, then redirect back to /pricing
    if ((tier as string).toLowerCase() !== "basic" && (tier as string).toLowerCase() !== "premium")
        push("/pricing");

    // tier is valid so continue checking out...
    const [user, loading] = useAuthState(auth);
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        fetch("/api/payment/session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: user?.email,
                tier: tier
            })
        }).then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [tier, user?.email])

    return (
        <div id="checkout">
            {clientSecret && (
                <EmbeddedCheckoutProvider
                    stripe={stripePromise}
                    options={{ clientSecret }}
                >
                    <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
            )}
        </div>
    )
}

export default Checkout;