// @ts-nocheck
'use client';

import {CredentialsTypes, ServicesAuthenticationTypes} from "@/services/authentication/type";

export const ServicesAuthentication: ServicesAuthenticationTypes = {
    async getUserCompanies() {
        const apiResponse = await mockData({username, password})
        const status = apiResponse.status

        if (status === 200 && !!apiResponse?.data) {
            localStorage.setItem(`token`, apiResponse?.data?.token)
            return true
        } else {
            return false
        }
    },
    async useLogout() {
        localStorage.removeItem(`token`)
    },
    getTokenData() {
        const token = localStorage.getItem(`token`)

        if (!!token) {
            return {
                username: "hirantravassos",
                firstname: "Hiran",
                lastname: "Travassos",
                email: "hirantravassos@gmail.com",
                phone: "(13) 9 2000-1834",
                cpf: "078.996.799-58",
            }
        } else {
            return null
        }
    }
}

interface MockDataResponse {
    status: number;
    data: {
        token: string;
    } | null;
}

const mockData = async ({username, password}: CredentialsTypes): Promise<MockDataResponse> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                status: 200,
                data: [{
                    name: 'developmentToken',
                    logo: null,

                },],
            });
        }, 1000);
    });
}