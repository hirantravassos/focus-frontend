'use client';

import styles from './index.module.scss';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation'
import {motion as m} from 'framer-motion'
import {animationDefault} from "@/styles/framer-motion";

interface TitleSubtitleTypes {
    title: string,
    subtitle?: string,
}

export default function TitleSubtitle({title, subtitle}: TitleSubtitleTypes) {
    const router = useRouter()
    const [data, setData] = useState()

    useEffect(() => {

    }, [])

    return (
        <m.div {...animationDefault} className={styles.main}>
            <div className={styles.title}>
                {title}
            </div>
            {subtitle &&
                <div className={styles.subtitle}>
                    {subtitle}
                </div>
            }
        </m.div>
    );
}