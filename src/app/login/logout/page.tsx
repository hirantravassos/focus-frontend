'use client';

import styles from './page.module.scss';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation'
import {motion as m} from 'framer-motion'
import {animationDefault} from "@/styles/framer-motion";
import {ServicesAuthentication} from "@/services/authentication";

export default function () {
    const router = useRouter()
    const [data, setData] = useState()

    useEffect(() => {
        ServicesAuthentication.useLogout()
        router.push(`/`)
    }, [])

    return (
        <m.div {...animationDefault} className={styles.main}>
            <span>SAINDO</span>
        </m.div>
    );
}