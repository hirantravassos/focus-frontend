'use client';
import {CredentialsTypes, ServicesAuthenticationTypes} from "@/services/authentication/type";

export const ServicesAuthentication: ServicesAuthenticationTypes = {
    async useLogin({username, password}) {
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
            if (username === 'hirantravassos' && password === '1234') {
                resolve({
                    status: 200,
                    data: {
                        token: 'developmentToken',
                    },
                });
            } else {
                resolve({
                    status: 401,
                    data: null,
                });
            }
        }, 1000);
    });
}