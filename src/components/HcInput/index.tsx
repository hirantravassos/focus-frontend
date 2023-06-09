'use client';

import styles from './index.module.scss';
import {MouseEventHandler, useEffect, useRef, useState} from 'react';
import {motion as m} from 'framer-motion'
import {animationDefault} from "@/styles/framer-motion";
import {Icon} from "@iconify/react";
import {Mask} from "@/utils/mask";
import {NumericFormat} from 'react-number-format';

type IInput = {
    label?: string,
    name?: string,
    width?: string,
    value?: string,
    icon?: string,
    loading?: boolean,
    hint?: string | null,
    mask?: string | null,
    required?: boolean,
    disabled?: boolean,
    invalid?: boolean,
    errorMessage?: string,
    onChange?: (value: string) => void,
    decimals?: number,
    max?: number
    min?: number
} & (
    | { type?: 'number', decimals: number, max?: number, min?: number }
    | { type?: 'text' | 'currency' | 'email' | 'password' }
    );

export default function HcInput(
    {
        label,
        name,
        width = '100%',
        value = ``,
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
    }: IInput) {
    const [isInvalid, setIsInvalid] = useState<boolean>(false)
    const handleChange = (e: any) => {
        const responseValue = handleMask(e.target.value)
        if (onChange) {
            onChange(responseValue?.raw)
        }
    }

    const handleMask = (unmaskedValue: string) => {
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
            onBlur={handleRequired}
        >
            <div className={styles.top}>
                <span className={
                    `${styles.label} ` +
                    `${icon ? styles.has_icon : ``} ` +
                    `${isInvalid ? styles.invalid : ``}`+
                    `${disabled ? styles.disabled : ``} `
                }>{required ? `* ${label}` : label}</span>
                <span className={styles.hint}>{hint}</span>
            </div>
            <div className={
                `${styles.middle} `+
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
                            handleChange(syntheticEvent)
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
                        value={handleMask(value)?.mask}
                        onChange={handleChange}
                        onKeyUp={handleRequired}
                        disabled={disabled}
                    />
                }
            </div>
            <div className={
                `${styles.bottom} `+
                `${disabled ? styles.disabled : ``} `
            }>
                {required && value?.length === 0 && errorMessage &&
                    <span className={styles.errorMessage}>{errorMessage}</span>
                }
            </div>
        </m.div>
    );
}
