'use client'

import {useRouter} from 'next/navigation';
import HcButton from "@/components/Button";
import HcInput from "@/components/Input";
import React, {useState, useRef, useEffect} from "react";
import HcAutocomplete from "@/components/Autocomplete";

export default function Home() {
    const router = useRouter()


    return (
        <>
            <main style={{display: 'flex', flexDirection: 'row'}}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <ButtonsDemo/>
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <InputsDemo/>
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <AutocompleteDemo/>
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
        console.log(`data`,data)
    },[data])

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
        mask: ``,
        username: `Hiran Travassos Sarinho`,
        number: `123456`
    })

    useEffect(() => {
        console.log(`data`,data)
    },[data])

    return (
        <>
            <HcAutocomplete
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
            <HcAutocomplete
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
            <HcAutocomplete
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
            <HcAutocomplete
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
            <HcAutocomplete
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
            <HcAutocomplete
                label={`Nome Completo`}
                name={`name`}
                width={'300px'}
                value={`Desabilitado`}
                disabled={true}
            />
            <HcAutocomplete
                label={`Desabilitado Sem Valor`}
                name={`name`}
                width={'300px'}
                value={``}
                disabled={true}
            />
        </>
    )
}