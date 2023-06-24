'use client';

import styles from './index.module.scss';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation'
import {motion as m} from 'framer-motion'
import {animationDefault} from "@/styles/framer-motion";
import Link from "next/link";

export default function UserHeader() {
    const router = useRouter()
    const [data, setData] = useState()

    useEffect(() => {

    }, [])

    return (
        <m.div {...animationDefault} className={styles.main}>
            <div className={styles.brand}>
                <img src={`/company-logo-light.svg`} alt={`company-logo`}/>
            </div>
            <div className={styles.items}>
                <Link href={`/authenticated/userpanel`}>Alguma Coisa</Link>
                <Link href={`/authenticated/userpanel`}>Alguma Coisa</Link>
                <Link href={`/authenticated/userpanel`}>Alguma Coisa</Link>
            </div>
            <div className={styles.logout}>
                <Link href={`/login/logout`}>Sair</Link>
            </div>
        </m.div>
    );
}