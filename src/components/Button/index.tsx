'use client';

import styles from './index.module.scss';
import {MouseEventHandler, useEffect, useState} from 'react';
import {useRouter} from 'next/navigation'
import {motion as m} from 'framer-motion'
import {animationDefault} from "@/styles/framer-motion";
import {Icon} from '@iconify/react';

interface ButtonTypes {
    label?: string,
    width?: string,
    appearance?: `primary` | `secondary` | `neutral` | `danger` | `alert` | `info`,
    variant?: `filled` | `outlined` | `plain`,
    icon?: string,
    loading?: boolean,
    disabled?: boolean,
    onClick?: (event: MouseEventHandler) => void,
}

export default function HcButton({
                                     label,
                                     icon,
                                     width = '100%',
                                     appearance = `primary`,
                                     variant = `filled`,
                                     loading,
                                     disabled = false,
                                     onClick,
                                 }: ButtonTypes) {

    const handleClick = (e: any) => {
        if (loading) return

        if (onClick) {
            onClick(e)
        }
    }

    return (
        <m.div
            {...animationDefault}
            className={
                `${styles.main} ` +
                `${styles[`appearance-${appearance}`]} ` +
                `${styles[`variant-${variant}`]} ` +
                `${loading ? styles.loading : ``}` +
                `${disabled ? styles.disabled : ``}`
            }
            style={{
                width: width,
            }}
            onClick={(e: any) => handleClick(e)}
        >
            {icon && !loading &&
                <div className={styles.icon}>
                    <Icon icon={icon}/>
                </div>
            }
            {label && !loading &&
                <span className={styles.label}>{label}</span>
            }
            {loading &&
                <div>
                    <Icon icon={`svg-spinners:ring-resize`}/>
                </div>
            }
        </m.div>
    );
}