'use client';

import styles from './index.module.scss';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation'
import {motion as m} from 'framer-motion'
import {animationDefault} from "@/styles/framer-motion";
import UserHeader from "@/components/Layout/User/Header";
import Link from "next/link";

export default function UserFooter() {
    const router = useRouter()
    const [data, setData] = useState()

    useEffect(() => {

    }, [])

    return (
        <m.div {...animationDefault} className={styles.main}>
            <div className={styles.column}>
                <span className={styles.title}>Anything</span>
                <Link className={styles.row} href={`/`}>Anything you should know</Link>
                <Link className={styles.row} href={`/`}>Anything you should know</Link>
                <Link className={styles.row} href={`/`}>Anything you should know</Link>
                <Link className={styles.row} href={`/`}>Anything you should know</Link>
            </div>
            <div className={styles.column}>
                <span className={styles.title}>Many Things</span>
                <Link className={styles.row} href={`/`}>Many Things you should know</Link>
                <Link className={styles.row} href={`/`}>Many Things you should know</Link>
                <Link className={styles.row} href={`/`}>Many Things you should know</Link>
            </div>
            <div className={styles.column}>
                <span className={styles.title}>Other Things</span>
                <Link className={styles.row} href={`/`}>Other Things you should know</Link>
                <Link className={styles.row} href={`/`}>Other Things you should know</Link>
                <Link className={styles.row} href={`/`}>Other Things you should know</Link>
                <Link className={styles.row} href={`/`}>Other Things you should know</Link>
                <Link className={styles.row} href={`/`}>Other Things you should know</Link>
                <Link className={styles.row} href={`/`}>Other Things you should know</Link>
            </div>
        </m.div>
    );
}