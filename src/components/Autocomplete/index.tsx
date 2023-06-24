'use client';

import styles from './index.module.scss';
import {Fragment, MouseEventHandler, useEffect, useRef, useState} from 'react';
import {AnimatePresence, motion as m} from 'framer-motion'
import {animationDefault, animationPopUp} from "@/styles/framer-motion";
import {Icon} from "@iconify/react";
import {Mask} from "@/utils/mask";
import {NumericFormat} from 'react-number-format';
import {webpack} from "next/dist/compiled/webpack/webpack";

type IAutocomplete = {
    label?: string,
    name?: string,
    width?: string,
    value?: string | null,
    icon?: string,
    loading?: boolean,
    hint?: string | null,
    mask?: string | null,
    required?: boolean,
    disabled?: boolean,
    invalid?: boolean,
    errorMessage?: string,
    onChange?: (value: any) => void,
    onSearch?: (value: string) => void,
    decimals?: number,
    max?: number
    min?: number
} & (
    | { type?: 'number', decimals: number, max?: number, min?: number }
    | { type?: 'text' | 'currency' | 'email' | 'password' }
    );

export default function HcAutocomplete(
    {
        label,
        name,
        width = '100%',
        value = null,
        type = `text`,
        decimals,
        max,
        min,
        icon,
        hint = null,
        mask = null,
        required = false,
        disabled = false,
        invalid = false,
        errorMessage = ``,
        onChange,
        onSearch,
    }: IAutocomplete) {
    const [focus, setFocus] = useState<boolean>(false)
    const [hover, setHover] = useState<boolean>(false)
    const [show, setShow] = useState<boolean>(false)

    const [isInvalid, setIsInvalid] = useState<boolean>(false)

    const handleSearch = (e: any) => {
        const responseValue = handleMask(e.target.value)
        if (onSearch) {
            onSearch(responseValue?.raw)
        }
    }

    const handleChange = (allValuesFromRow: any) => {
        if (onChange) {
            onChange(allValuesFromRow)
        }
    }

    const handleMask = (unmaskedValue: string | null) => {
        if (mask) {
            return Mask(unmaskedValue, mask)
        }

        return {mask: unmaskedValue, raw: unmaskedValue}
    }

    const handleNumberLimits = (values: any) => {
        const {floatValue} = values;
        if (!floatValue || floatValue === 0) return true


        let allowed = true
        if (!!max && !!min) {
            allowed = floatValue <= max && floatValue >= min;
        }

        if (!min && !!max) {
            allowed = floatValue <= max;
        }

        if (!max && !!min) {
            allowed = floatValue >= min;
        }

        return allowed
    }

    const handleRequired = () => {
        setIsInvalid(false)
        const isEmpty = value?.length === 0 && required
        if (isEmpty) setIsInvalid(true)
    }

    useEffect(() => {
        setTimeout(() => {
            setShow(focus)
        }, 50)
    }, [focus])

    return (
        <m.div
            {...animationDefault}
            className={
                `${styles.main} ` +
                `${value ? styles.value : ``} ` +
                `${disabled ? styles.disabled : ``} `
            }
            style={{
                width: width,
            }}
            onBlur={() => {
                handleRequired()
                setFocus(false)
            }}
            onFocus={() => setFocus(true)}
        >
            <div className={styles.top}>
                <span className={
                    `${styles.label} ` +
                    `${icon ? styles.has_icon : ``} ` +
                    `${isInvalid ? styles.invalid : ``}` +
                    `${disabled ? styles.disabled : ``} `
                }>{required ? `* ${label}` : label}</span>
                <span className={styles.hint}>{hint}</span>
            </div>
            <div className={
                `${styles.middle} ` +
                `${disabled ? styles.disabled : ``} `
            }>
                {icon &&
                    <Icon className={styles.icon} icon={icon}/>
                }
                {type === `number` || type === `currency` ?
                    <NumericFormat
                        className={
                            `${styles.input} ` +
                            `${icon ? styles.has_icon : ``} `
                        }
                        value={value}
                        disabled={disabled}
                        onValueChange={(values) => {
                            const syntheticEvent = {
                                target: {value: values.floatValue}
                            }
                            handleSearch(syntheticEvent)
                        }}
                        onKeyUp={handleRequired}
                        isAllowed={handleNumberLimits}
                        thousandSeparator=""
                        decimalSeparator=","
                        allowedDecimalSeparators={['.', ',']}
                        decimalScale={type === `currency` ? 2 : decimals}
                        fixedDecimalScale={type === `currency`}
                    />
                    :
                    <input
                        className={
                            `${styles.input} ` +
                            `${icon ? styles.has_icon : ``} `
                        }
                        value={handleMask(value)?.mask || ``}
                        onChange={handleSearch}
                        onKeyUp={handleRequired}
                        disabled={disabled}
                    />
                }
            </div>
            <div className={
                `${styles.bottom} ` +
                `${disabled ? styles.disabled : ``} `
            }>
                {required && value?.length === 0 && errorMessage &&
                    <span className={styles.errorMessage}>{errorMessage}</span>
                }
            </div>
            <AnimatePresence>
                {show && !disabled &&
                    <m.div
                        className={styles.list}
                        {...animationPopUp}
                    >
                        {mockData?.map((row, index) => {
                            return (
                                <Fragment key={index}>
                                    <div
                                        className={styles.row}
                                        onClick={() => handleChange(row)}
                                    >
                                        <span>{row?.value}</span>
                                    </div>
                                </Fragment>
                            )
                        })}
                    </m.div>
                }
            </AnimatePresence>
        </m.div>
    );
}

const mockData = [
    {id: 0, value: `Valor 1`},
    {id: 1, value: `Valor 2`},
    {id: 2, value: `Valor 3`},
    {id: 3, value: `Valor 4`},
]