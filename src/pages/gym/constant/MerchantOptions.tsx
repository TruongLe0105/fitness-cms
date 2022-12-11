import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';


export const MerchantOptions = () => {
    const { merchants } = useSelector((state: any) => state.subject);
    const [options, setOptions] = useState({
        label: "",
        value: ""
    });

    const optionsMerchant: any = [];

    useEffect(() => {
        merchants.forEach((merchant) => {
            setOptions({
                ...options,
                label: merchant.name,
                value: merchant._id
            })
            optionsMerchant.push(options)
        })
    }, [])

    console.log('herer, ', optionsMerchant)
}

