export interface MenuLegalProps {
    active: number;
    handleChangeMenu: (index: number, field: TYPE_LEGAL) => () => void;
}

export enum TYPE_LEGAL {
    PRIVACY_POLICY = "Policy",
    TERMS = "Terms",
    MEDICAN = "Medican"
}
export interface MenuLegalDetail {
    title: string;
    field: TYPE_LEGAL;
}

export const LIST_MENU_LEGAL: MenuLegalDetail[] = [
    {
        title: "Terms of Service",
        field: TYPE_LEGAL.TERMS,
    },
    {
        title: "Privacy Policy",
        field: TYPE_LEGAL.PRIVACY_POLICY,
    },
    {
        title: "Medican",
        field: TYPE_LEGAL.MEDICAN,
    }
];
export interface LegalPageDetail {
    name: string;
    value: string;
}

export const defaultEmptyLegalPage: LegalPageDetail = {
    name: "",
    value: "",
};

export interface FormUpdateProps {
    openPopup: boolean;
    handleClosePopup: () => void;
    title: string;
    valueInput: string;
    field: TYPE_LEGAL;
    handleUpdateData: (dataRes: LegalPageDetail) => void;
}
