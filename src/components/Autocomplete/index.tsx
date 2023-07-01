'use client';

import styles from './index.module.scss';
import {ComponentType, Fragment, MouseEventHandler, useEffect, useRef, useState} from 'react';
import {AnimatePresence, motion as m} from 'framer-motion'
import {animationDefault, animationPopUp} from "@/styles/framer-motion";
import {Icon} from "@iconify/react";
import {Mask} from "@/utils/mask";
import {NumericFormat} from 'react-number-format';
import {IColor} from "@/styles/theme";

type IAutocomplete = {
    removeSelectionLabel?: string,
    data: { [key: string]: any }[] | [],
    dataComponents?: { component: ComponentType<any> }[],
    maxHeight?: string,
    label?: string,
    name?: string,
    width?: string,
    value?: { key: string, selected: any | null | undefined },
    icon?: string,
    loading?: boolean,
    hint?: string | null,
    mask?: string | null,
    required?: boolean,
    disabled?: boolean,
    invalid?: boolean,
    errorMessage?: string,
    onChange?: (value: any) => void,
}

export default function HcAutocomplete(
    {
        removeSelectionLabel = `Clear`,
        data,
        dataComponents,
        maxHeight = '350px',
        label,
        name,
        width = '100%',
        value,
        icon,
        loading = false,
        hint = null,
        mask = null,
        required = false,
        disabled = false,
        invalid = false,
        errorMessage = ``,
        onChange,
    }: IAutocomplete) {
    const listRef = useRef(null)
    const [listHeight, setListHeight] = useState<number>(0)
    const [hasValue, setHasValue] = useState<boolean>(false)
    const [valueToDisplay, setValueToDisplay] = useState<any>(null)
    const [searchValue, setSearchValue] = useState<string>(``)
    const [focus, setFocus] = useState<boolean>(false)
    const [hover, setHover] = useState<boolean>(false)
    const [show, setShow] = useState<boolean>(false)
    const [isInvalid, setIsInvalid] = useState<boolean>(false)
    const [firstFocus, setFirstFocus] = useState<boolean>(true)

    const handleSearch = (e: any) => {
        setSearchValue(e?.target?.value)
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

    const handleRequired = () => {
        console.log(`handleRequired`, hasValue)
        setIsInvalid(false)
        if (!hasValue && required) setIsInvalid(true)
    }

    const isValuesInSearch = (json: any) => {
        if (!searchValue || searchValue === ``) return true

        let keys: string[] = []
        for (let key in json) {
            keys.push(key)
        }

        let exists = false
        keys?.map((key: string) => {
            try {
                const _searchValue = mask ? Mask(searchValue, mask)?.raw : searchValue
                const keyValue = String(json?.[key])
                if (keyValue.includes(_searchValue)) exists = true
            } catch (e) {
            }
        })

        return exists
    }

    useEffect(() => {
        // @ts-ignore
        const newHeight = listRef?.current?.clientHeight

        setListHeight(newHeight !== 0 ? newHeight : 60)
    }, [show, searchValue, loading, disabled])

    useEffect(() => {
        if (focus) setFirstFocus(false)

        setTimeout(() => {

            setShow(focus)
            setShow(focus)
            setSearchValue(``)
        }, 50)
    }, [focus])

    useEffect(() => {
        setValueToDisplay(value?.selected?.[value?.key])
        setHasValue(!!value?.selected)
    }, [value])

    useEffect(() => {
        if (!firstFocus) {
            handleRequired()
        }
    }, [hasValue])

    return (
        <m.div
            {...animationDefault}
            className={
                `${styles.main} ` +
                `${hasValue ? styles.value : ``} ` +
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
                <span className={
                    `${styles.input} ` +
                    `${icon ? styles.has_icon : ``}`
                }>
                    {mask ? Mask(valueToDisplay, mask)?.mask : valueToDisplay}
                </span>
                <input
                    className={
                        `${styles.searchInput} `
                    }
                    value={mask ? handleMask(searchValue)?.mask || `` : searchValue}
                    onInput={handleSearch}
                    disabled={disabled}
                />
            </div>
            <div className={
                `${styles.bottom} ` +
                `${disabled ? styles.disabled : ``} `
            }>
                {required && !hasValue && !firstFocus && errorMessage &&
                    <span className={styles.errorMessage}>{errorMessage}</span>
                }
            </div>
            <AnimatePresence>
                {show && !disabled &&
                    <m.div
                        className={styles.container}
                        style={{minHeight: `${loading ? `100px` : `calc(${listHeight}px + 65px)`}`}}
                        {...animationPopUp}
                    >
                        <div className={styles.rowSearch}>
                            <Icon
                                className={styles.rowSearchIcon}
                                icon={`material-symbols:search`}
                            />
                        </div>
                        <div
                            ref={listRef}
                            className={styles.list}
                            style={{maxHeight: maxHeight}}
                        >
                            {!loading ?
                                data?.map((row: any, index: number) => {
                                    const hasValue = !!value && index === 0

                                    if (!isValuesInSearch(row)) return

                                    return (
                                        <Fragment key={index}>
                                            {hasValue &&
                                                <div
                                                    className={`${styles.row} ${styles.removeValue}`}
                                                    onClick={() => handleChange(null)}
                                                >
                                                    <Icon className={styles.rowIcon} icon={`mdi:delete-sweep`}/>
                                                    <span>{removeSelectionLabel}</span>
                                                </div>
                                            }
                                            {dataComponents?.map((component, componentIndex) => {
                                                const DataComponent = component?.component
                                                return (
                                                    <Fragment key={componentIndex}>
                                                        <div
                                                            className={styles.row}
                                                            onClick={() => handleChange(row)}
                                                        >
                                                            <DataComponent values={row}/>
                                                        </div>
                                                    </Fragment>
                                                )
                                            })}
                                        </Fragment>
                                    )
                                })
                                :
                                <div className={styles.loading}>
                                    <Icon className={styles.icon} icon={`svg-spinners:ring-resize`}/>
                                </div>
                            }
                        </div>
                    </m.div>
                }
            </AnimatePresence>
        </m.div>
    );
}

