'use client';

import styles from './page.module.scss';
import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation'
import {motion as m} from 'framer-motion'
import {ServicesAuthentication} from "@/services/authentication";
import {TokenDataTypes} from "@/services/authentication/type";
import {animationDefault} from "@/styles/framer-motion";
import LayoutUser from "@/components/Layout/User";
import TitleSubtitle from "@/components/TitleSubtitle";
import SectionUser from "@/app/authenticated/userpanel/SectionUser";
import {PanelContext} from "@/app/authenticated/userpanel/panelContext";

export default function UserPanel() {
    const router = useRouter()
    const [data, setData] = useState<TokenDataTypes | null>(null)

    useEffect(() => {
        const tokenData = ServicesAuthentication.getTokenData()

        if (!!tokenData) {
            setData(tokenData)
        }
    }, [])

    return (
        <LayoutUser>
            <PanelContext.Provider value={{
                data, setData
            }}>
                <m.div {...animationDefault} className={styles.main}>
                    <TitleSubtitle
                        title={`Painel do Usuário`}
                    />
                    <SectionUser/>
                </m.div>
            </PanelContext.Provider>
        </LayoutUser>
    );
}

