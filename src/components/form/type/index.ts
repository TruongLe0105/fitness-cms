export interface AddClientInput {
    name: string,
    phone: string,
    email: string,
    password: string,
    passwordConfirm: string,
}

export interface FormAddClient {
    openFormChange?: boolean,
    onClose: () => void,
    client?: InputClient,
    handleUpdateList: () => void
}

export interface InputClient {
    email: string,
    password: string,
    passwordConfirm: string,
    merchantName: string,
    phone: string,
}