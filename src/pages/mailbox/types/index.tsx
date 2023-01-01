export interface MailboxDetail {
    id: string;
    title: string;
    content: string;
    images: string[];
    status: string;
    sendTo: string;
    includes?: string[];
    // gym?: string;
    // package?: string;
    // event?: string;
    createdAt: number;
    updatedAt: number;
}

export const emptyMailboxDetail: MailboxDetail = {
    id: "0",
    title: "",
    content: "",
    status: "",
    sendTo: "",
    createdAt: 0,
    updatedAt: 0,
    images: [],
}

export interface ParamsRequest {
    limit: number;
    page: number;
    orderBy?: string;
    orderDirection?: string;
    sort?: string;
    search?: string;
    keyword?: string;
    types?: string[];
}

export interface InputMail {
    title: string;
    content: string;
    sendTo: string;
    includes?: string[];
    images?: string[];
    gym?: string;
    package?: string;
    event?: string;
}

export interface FormSendMail {
    onClose: () => void;
    openFormChange: boolean;
    onRefetch: () => void;
    // mailbox: InputMail;
}

export interface SendToOptions {
    label: string;
    value: string;
}