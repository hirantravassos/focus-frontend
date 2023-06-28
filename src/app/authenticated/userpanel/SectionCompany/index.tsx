import React, {useEffect} from "react";
import styles from './index.module.scss';
import {motion as m} from "framer-motion";
import {animationDefault} from "@/styles/framer-motion";

export default function SectionCompany() {
    useEffect(() => {

    },[])

    return (
        <m.div {...animationDefault} className={styles.main}>
            {/*<div className={styles.title}>*/}
            {/*    <span style={{flex: 5}}>Seus Dados</span>*/}
            {/*    <button style={{flex: 1}}>Editar</button>*/}
            {/*</div>*/}
            {/*<div className={styles.section}>*/}
            {/*    <span className={styles.description}>{`Nome`}</span>*/}
            {/*    <span className={styles.value}>{`${data?.firstname} ${data?.lastname}`}</span>*/}
            {/*</div>*/}
            {/*<div className={styles.section}>*/}
            {/*    <span className={styles.description}>{`Email`}</span>*/}
            {/*    <span className={styles.value}>{data?.email}</span>*/}
            {/*</div>*/}
            {/*<div className={styles.section}>*/}
            {/*    <span className={styles.description}>{`Telefone`}</span>*/}
            {/*    <span className={styles.value}>{data?.phone}</span>*/}
            {/*</div>*/}
            {/*<div className={styles.section}>*/}
            {/*    <span className={styles.description}>{`Document CPF`}</span>*/}
            {/*    <span className={styles.value}>{data?.cpf}</span>*/}
            {/*</div>*/}
        </m.div>
    )
}