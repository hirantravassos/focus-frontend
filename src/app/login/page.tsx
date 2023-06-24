'use client';

import {useRouter} from 'next/navigation';
import {ServicesAuthentication} from "@/services/authentication";
import {useState} from "react";

export default function Login() {
    const router = useRouter()
    const [error, setError] = useState<boolean>(false)

    const handleSubmit = (e: any) => {
        e.preventDefault()
        setError(false)

        const username = e?.target?.username?.value
        const password = e?.target?.password?.value

        ServicesAuthentication.useLogin({username, password})
            .then((isLoginApproved) => {
                if (isLoginApproved) {
                    router.push(`/authenticated`)
                } else {
                    setError(true)
                }
            })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input name={`username`}/>
                <label>Password</label>
                <input name={`password`} type={`password`}/>
                <button type={`submit`}>Submit</button>
            </form>
        </div>
    )
}