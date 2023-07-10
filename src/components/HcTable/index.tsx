'use client';

import styles from './index.module.scss';
import {ComponentType, Fragment, MouseEventHandler, useEffect, useRef, useState} from 'react';
import {AnimatePresence, motion as m} from 'framer-motion'
import {animationDefault, animationPopUp} from "@/styles/framer-motion";
import {Icon} from "@iconify/react";
import HcAutocomplete from "@/components/HcAutocomplete";

type ITable = {
    data: { [key: string]: any }[] | [],
    rowComponents?: {
        flex: number,
        direction: "column" | "row" | string,
        component: ComponentType<any>
    }[],
    headers: { key: string, label: string }[],
    labels?: {
        totalItems?: string,
        itemsPerPage?: string,
    },
    pagination?: {
        controlled: boolean,
        currentPage?: number,
        onPageChange?: () => any,
        totalPages?: number,
        optionsItemsPerPage?: number[],
        onOptionsChange?: () => any,
    } & (PaginationControlled | PaginationUncontrolled)
}

type PaginationControlled = {
    controlled: true,
    currentPage: number,
    onPageChange?: () => any,
    totalPages: number,
    optionsItemsPerPage?: number[] | null,
    onOptionsChange?: () => any
}

type PaginationUncontrolled = {
    controlled: false,
    optionsItemsPerPage?: number[]
}

export default function HcTable(
    {
        data,
        rowComponents,
        headers,
        labels = {
            totalItems: "Total Items:",
            itemsPerPage: "Items Per Page"
        },
        pagination = {
            controlled: false,
            optionsItemsPerPage: [10, 20, 50]
        },
    }: ITable) {
    const [selected, setSelected] = useState<any>(null)
    const [sort, setSort] = useState<any>(null)
    const [tableData, setTableData] = useState<any[] | []>([])
    const [tablePage, setTablePage] = useState<number>(0)
    const [tablePageArray, setTablePageArray] = useState<number[]>([0])
    const [tablePageQuantity, setTablePageQuantity] = useState<number>(0)
    const [tableItemsPerPage, setTableItemsPerPage] = useState<number>(10)
    const [tableOptionsItemsPerPage, setTableOptionsItemsPerPage] = useState<number[]>([10, 20, 50])
    const [showOptions, setShowOptions] = useState<boolean>(false)

    const handleSelection = (row: any) => {
        setSelected(row)
    }

    const handleSort = (key: string) => {
        const currentSort = sort?.[key];
        let sortedData: any[];

        if (currentSort === "asc") {
            sortedData = [...tableData].sort((a, b) => {
                if (a[key] > b[key]) return -1;
                if (a[key] < b[key]) return 1;
                return 0;
            });
            setSort({
                [key]: 'desc',
            });
        }

        if (currentSort === "desc") {
            sortedData = data
            setSort({
                [key]: null,
            });
        }

        if (!currentSort) {
            sortedData = [...tableData].sort((a, b) => {
                if (a[key] < b[key]) return -1;
                if (a[key] > b[key]) return 1;
                return 0;
            });
            setSort({
                [key]: 'asc',
            });
        }

        // @ts-ignore
        setTableData(sortedData);
    };

    const handleItemsPerPageChange = (newItemsPerPage: number) => {
        setShowOptions(false)
        setTableItemsPerPage(newItemsPerPage)
    }

    useEffect(() => {
        if (data?.length > 0) {
            setTablePageQuantity((data?.length - 1) / tableItemsPerPage)
        }
    }, [tableItemsPerPage])

    useEffect(() => {
        const tempArray = []

        for (let i = 0; i <= tablePageQuantity; i++) {
            tempArray.push(i)
        }

        setTablePageArray(tempArray)
    }, [tablePageQuantity])

    useEffect(() => {
        if (tablePage > tablePageArray?.length) {
            setTablePage(0)
        }
    },[tablePageArray])

    useEffect(() => {
        setTableItemsPerPage(tableOptionsItemsPerPage[tablePage] || 10)

        if (data?.length > 0) {
            setTablePageQuantity((data?.length - 1) / (tableOptionsItemsPerPage[tablePage]))
        }
    },[tableOptionsItemsPerPage])

    useEffect(() => {
        setTableData(data)

        if (!pagination?.controlled) {
            setTablePage(tablePage)
            setTableOptionsItemsPerPage(pagination?.optionsItemsPerPage || tableOptionsItemsPerPage)
        }
    }, [])

    return (
        <m.div
            {...animationDefault}
            className={styles.main}
        >
            <div className={styles.header}>
                {headers?.map((header, indexHeader) => {
                    const sortDirection = sort?.[header?.key]

                    return (
                        <Fragment key={indexHeader}>
                            <div className={styles.sort}>
                                {sortDirection === `asc` &&
                                    < Icon icon={`mdi:arrow-down`}/>
                                }
                                {sortDirection === `desc` &&
                                    < Icon icon={`mdi:arrow-up`}/>
                                }
                                {!sortDirection &&
                                    < Icon icon={`mdi:arrow-up-down`}/>
                                }
                            </div>
                            <div
                                className={styles.column}
                                style={{flex: rowComponents?.[indexHeader]?.flex}}
                                onClick={() => handleSort(header?.key)}
                            >
                                {header?.label}
                            </div>

                        </Fragment>
                    )
                })}
            </div>
            <div className={styles.body}>
                {tableData?.map((row, indexRow) => {
                    const isSelected = selected?.id === row?.id
                    const minRange = tablePage * tableItemsPerPage
                    const maxRange = (tablePage * tableItemsPerPage) + tableItemsPerPage - 1

                    if (indexRow < minRange || indexRow > maxRange) return

                    return (
                        <Fragment key={indexRow}>
                            <div
                                className={`${styles.row} ${isSelected ? styles.selected : ``}`}
                                onClick={() => handleSelection(row)}
                            >
                                {rowComponents?.map((component, indexComponent) => {
                                    const Component = component?.component
                                    return (
                                        <Fragment key={indexComponent}>
                                            <div
                                                className={styles.component}
                                                style={{
                                                    flex: component?.flex,
                                                    // @ts-ignore
                                                    flexDirection: component?.direction
                                                }}
                                            >
                                                <Component values={row}/>
                                            </div>
                                        </Fragment>
                                    )
                                })}
                            </div>
                        </Fragment>
                    )
                })}
            </div>
            <div className={styles.footer}>
                <div className={styles.pages}>
                    {tablePageArray.map((page, indexPage) => {
                        const isSelected = tablePage === page
                        const show = page === 0 ||
                            tablePage === page ||
                            tablePage + 1 === page ||
                            tablePage + 2 === page ||
                            tablePage - 1 === page ||
                            tablePage - 2 === page ||
                            tablePageArray?.length - 1 === page

                        const showEllipse = tablePage + 3 === page ||
                            tablePage - 3 === page

                        if (!show && !showEllipse) return
                        if (!show && showEllipse) return (
                            <Fragment key={indexPage}>
                                <span
                                    className={
                                        `${styles.page} `
                                    }
                                    onClick={() => setTablePage(page)}
                                >...</span>
                            </Fragment>
                        )

                        return (
                            <Fragment key={indexPage}>
                                <span
                                    className={
                                        `${styles.page} ` +
                                        `${isSelected ? styles.selected : ``}`
                                    }
                                    onClick={() => setTablePage(page)}
                                >{page + 1}</span>
                            </Fragment>
                        )
                    })}
                </div>
                <div className={styles.options}>
                    <span
                        className={styles.current}
                        onClick={() => setShowOptions(!showOptions)}
                    >{`${tableItemsPerPage} ${labels?.itemsPerPage}`}</span>
                    {showOptions &&
                        <div className={styles.list} style={{top: `-${
                                (tableOptionsItemsPerPage?.length * 34) + 8 > 200 ? 
                                    204 :
                                    (tableOptionsItemsPerPage?.length * 34) + 8
                        }px`}}>
                            {tableOptionsItemsPerPage?.map((option, index) => {
                                return (
                                    <Fragment key={index}>
                                        <span
                                            className={styles.option}
                                            onClick={() => handleItemsPerPageChange(option)}
                                        >{option}</span>
                                    </Fragment>
                                )
                            })}
                        </div>
                    }
                </div>
                <div className={styles.content}>
                    <span>{labels?.totalItems}</span>
                    <span>{data?.length}</span>
                </div>
            </div>
        </m.div>
    );
}

function Footer() {

}

