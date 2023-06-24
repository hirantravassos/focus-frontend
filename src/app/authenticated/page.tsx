'use client';

import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation'
import {motion as m} from 'framer-motion'
import {ServicesAuthentication} from "@/services/authentication";

export default function Authenticated() {
    const router = useRouter()
    const [userName, setUserName] = useState<string | null>('')

    useEffect(() => {
        const tokenData = ServicesAuthentication.getTokenData()

        if (tokenData) {
            setUserName(tokenData?.firstname)
            setTimeout(() => {
                router.push(`/authenticated/userpanel`)
            },2000)
        } else {
            router.push(`/login`)
        }
    }, [])

    return (
        <m.div>
            <span>{`Bem-vindo de volta, ${userName}`}</span>
        </m.div>
    );
}