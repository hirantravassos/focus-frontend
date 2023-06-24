export interface ServicesAuthenticationTypes {
    useLogin({username, password}: CredentialsTypes): Promise<boolean>,
    useLogout(): void,
    getTokenData(): TokenDataTypes | null,
}

export interface TokenDataTypes {
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    phone: string,
    cpf: string,
}

export interface CredentialsTypes {
    username: string;
    password: string;
}