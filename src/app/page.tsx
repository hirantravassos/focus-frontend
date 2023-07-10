'use client'

import HcButton from "../components/HcButton";
import HcInput from "../components/HcInput";
import React, {useState, useEffect} from "react";
import HcAutocomplete from "../components/HcAutocomplete";
import {IColor} from "@/styles/theme";
import {Mask} from "@/utils/mask";
import HcTable from "@/components/HcTable";

export default function Home() {
    return (
        <>
            <main style={{display: 'flex', flexDirection: 'row'}}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    {/*<ButtonsDemo/>*/}
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    {/*<InputsDemo/>*/}
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <AutocompleteDemo/>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', width: '800px'}}>
                    <TableDemo/>
                </div>
            </main>
        </>
    )
}

function ButtonsDemo() {
    const appearance = `neutral`

    return (
        <>
            <HcButton
                label={`Primary Outlined`}
                icon={`material-symbols:login`}
                variant={`outlined`}
                appearance={appearance}
                width={'250px'}
                onClick={(e) => console.log(e)}
            />
            <HcButton
                label={`Primary Filled`}
                icon={`material-symbols:login`}
                variant={`filled`}
                appearance={appearance}
                width={'250px'}
            />
            <HcButton
                label={`Primary Plain`}
                icon={`material-symbols:login`}
                variant={`plain`}
                appearance={appearance}
                width={'250px'}
            />
            <HcButton
                label={`Primary Plain`}
                icon={`material-symbols:login`}
                variant={`outlined`}
                appearance={appearance}
                width={'250px'}
                loading={true}
            />
            <HcButton
                label={`Primary Plain`}
                icon={`material-symbols:login`}
                variant={`filled`}
                appearance={appearance}
                width={'250px'}
                loading={true}
            />
            <HcButton
                label={`Primary Plain`}
                icon={`material-symbols:login`}
                variant={`plain`}
                appearance={appearance}
                width={'250px'}
                loading={true}
            />
            <HcButton
                label={`Primary Disabled`}
                icon={`material-symbols:login`}
                variant={`filled`}
                appearance={appearance}
                width={'250px'}
                disabled={true}
            />
        </>
    )
}

function InputsDemo() {
    const [data, setData] = useState({
        mask: ``,
        username: `Hiran Travassos Sarinho`,
        number: `123456`
    })

    useEffect(() => {
        console.log(`data`, data)
    }, [data])

    return (
        <>
            <HcInput
                label={`Habilitado Obrigatório`}
                name={`name`}
                width={'300px'}
                value={data?.username}
                required={true}
                onChange={(value) => setData((prev: any) => ({
                    ...prev,
                    username: value
                }))}
                errorMessage={`Campo obrigatório!`}
            />
            <HcInput
                label={`Mascara`}
                name={`mask`}
                width={'300px'}
                value={data?.mask}
                mask={`000.000.000-00`}
                type={`text`}
                onChange={(value) => setData((prev: any) => ({
                    ...prev,
                    mask: value
                }))}
            />
            <HcInput
                label={`Nome e ícone`}
                name={`name`}
                width={'300px'}
                value={data?.username}
                type={"text"}
                icon={`icon-park-twotone:edit-name`}
                required={true}
                onChange={(value) => setData((prev: any) => ({
                    ...prev,
                    username: value
                }))}
            />
            <HcInput
                label={`Nome Completo e Hint`}
                name={`name`}
                width={'300px'}
                value={data?.username}
                hint={`Insira seu nome.`}
                onChange={(value) => setData((prev: any) => ({
                    ...prev,
                    username: value
                }))}
            />
            <HcInput
                label={`Número`}
                name={`number`}
                width={'300px'}
                value={data?.number}
                invalid={true}
                required={true}
                type={`number`}
                decimals={2}
                max={2000}
                min={-2000000}
                errorMessage={`Campo inválido!`}
                onChange={(value) => setData((prev: any) => ({
                    ...prev,
                    number: value
                }))}
            />
            <HcInput
                label={`Nome Completo`}
                name={`name`}
                width={'300px'}
                value={`Desabilitado`}
                disabled={true}
            />
            <HcInput
                label={`Desabilitado Sem Valor`}
                name={`name`}
                width={'300px'}
                value={``}
                disabled={true}
            />
        </>
    )
}

function AutocompleteDemo() {
    const [data, setData] = useState({
        data1: {id: 0, value: `Valor 1`, cnpj: `12345678910`, number: 0.123},
        data2: null,
        data3: null,
        data4: null,
    })

    const dataComponents = {
        data1: [
            {
                component: ({values}: any) => {
                    return (
                        <div>{values?.value}</div>
                    )
                }
            }
        ],
        data2: [
            {
                component: ({values}: any) => {
                    return (
                        <div>{Mask(values?.cnpj, `000.000.000-00`)?.mask}</div>
                    )
                }
            }
        ],
        data3: [
            {
                component: ({values}: any) => {
                    return (
                        <div>{values?.number}</div>
                    )
                }
            }
        ],
        data4: [
            {
                component: ({values}: any) => {
                    return (
                        <div>{values?.value}</div>
                    )
                }
            }
        ],
    }


    useEffect(() => {
        console.log(`data`, data)
    }, [data])

    const [loading, setLoading] = useState<boolean>(true)
    const fetchMockData = (): any => {
        setTimeout(() => {
            setLoading(false)
        }, 3000)

        return mockData
    }

    return (
        <>
            <HcAutocomplete
                data={fetchMockData()}
                loading={loading}
                dataComponents={dataComponents?.data1}
                label={`Habilitado Obrigatório`}
                name={`name`}
                width={'300px'}
                maxHeight={`200px`}
                value={{key: `value`, selected: data?.data1}}
                required={true}
                onChange={(value) => setData((prev: any) => ({
                    ...prev,
                    data1: value
                }))}
                errorMessage={`Campo obrigatório!`}
                removeSelectionLabel={`Limpar valores`}
            />
            <HcAutocomplete
                data={mockData()}
                dataComponents={dataComponents?.data2}
                label={`Mascara`}
                name={`mask`}
                width={'300px'}
                maxHeight={`300px`}
                value={{key: `cnpj`, selected: data?.data2}}
                mask={`000.000.000-00`}
                onChange={(value) => setData((prev: any) => ({
                    ...prev,
                    data2: value
                }))}
            />
            <HcAutocomplete
                data={mockData()}
                dataComponents={dataComponents?.data3}
                label={`Nome e ícone`}
                name={`name`}
                width={'300px'}
                maxHeight={`200px`}
                value={{key: `number`, selected: data?.data3}}
                icon={`icon-park-twotone:edit-name`}
                required={true}
                onChange={(value) => setData((prev: any) => ({
                    ...prev,
                    data3: value
                }))}
                errorMessage={`Campo obrigatório!`}
            />
            <HcAutocomplete
                data={mockData()}
                dataComponents={dataComponents?.data4}
                label={`Nome Completo e Hint`}
                name={`name`}
                width={'300px'}
                maxHeight={`200px`}
                value={{key: `value`, selected: data?.data4}}
                hint={`Insira seu nome.`}
                onChange={(value) => setData((prev: any) => ({
                    ...prev,
                    data4: value
                }))}
            />
            <HcAutocomplete
                data={mockData()}
                dataComponents={[]}
                label={`Nome Completo`}
                name={`name`}
                width={'300px'}
                maxHeight={`200px`}
                value={{key: `value`, selected: {value: "Desabilitado"}}}
                disabled={true}
            />
            <HcAutocomplete
                data={mockData()}
                label={`Desabilitado Sem Valor`}
                name={`name`}
                width={'300px'}
                maxHeight={`200px`}
                value={{key: `value`, selected: null}}
                disabled={true}
            />
        </>
    )
}

function TableDemo() {
    const headers = [
        {key: "id", label: `ID`},
        {key: "value", label: `Value`},
        {key: "cnpj", label: `CNPJ`},
        {key: "number", label: `Number`},
    ]

    const rowComponents = [
        {
            flex: 1,
            direction: `column`,
            component: ({values}: any) => {
                return (
                    <div>{values?.id}</div>
                )
            }
        },
        {
            flex: 1,
            direction: `column`,
            component: ({values}: any) => {
                return (
                    <div>{values?.value}</div>
                )
            }
        },
        {
            flex: 1,
            direction: `column`,
            component: ({values}: any) => {
                const cnpj = Mask(values?.cnpj || ``, "000.000.000-00")?.mask

                return (
                    <div>{cnpj}</div>
                )
            }
        },
        {
            flex: 1,
            direction: `column`,
            component: ({values}: any) => {
                return (
                    <div>{values?.number}</div>
                )
            }
        }
    ]

    const [loading, setLoading] = useState<boolean>(true)
    const fetchMockData = (): any => {
        setTimeout(() => {
            setLoading(false)
        }, 3000)

        return mockData
    }

    return (
        <>
            <HcTable
                data={mockData(100)}
                headers={headers}
                rowComponents={rowComponents}
                pagination={{optionsItemsPerPage: [5, 10, 15, 20, 25, 30, 35, 50, 100]}}
            />
        </>
    )
}

const mockData = (limit: number = 100) => {
    const tempData = []

    for (let i = 0; i < limit; i++) {
        tempData.push({
            id: i,
            value: `Valor ${i}`,
            cnpj: `${Math.floor(Math.random() * (99999999999 - 10000000000 + 1)) + 10000000000}`,
            number: `${Math.floor(Math.random() * (99999999999 - 10000000000 + 1)) + 10000000000}`
        })
    }

    return tempData
}