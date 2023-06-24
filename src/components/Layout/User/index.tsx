'use client';

import styles from './index.module.scss';
import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation'
import {motion as m} from 'framer-motion'
import {animationDefault} from "@/styles/framer-motion";
import UserHeader from "@/components/Layout/User/Header";
import UserFooter from "@/components/Layout/User/Footer";

export default function LayoutUser({children}: { children: React.ReactNode }) {
    const router = useRouter()

    useEffect(() => {

    }, [])

    return (
        <m.div {...animationDefault} className={styles.main}>
            <UserHeader/>
            <div className={styles.scrollable}>
                <div className={styles.contents}>
                    {children}
                </div>
                <UserFooter/>
            </div>
        </m.div>
    );
}