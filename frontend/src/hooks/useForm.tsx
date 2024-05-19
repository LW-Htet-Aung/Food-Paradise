import { useState, ChangeEvent, FormEvent, useCallback } from 'react';
import axios from './../helpers/axios';

type FormValues = {
    [key: string]: unknown;
}

type UseFormProps<T, V> = {
    defaultState: T;
    submitUrl: string;
    onSuccess?: (data?: V) => void;
}

type ErrorType = {
    error?: string
}
const useForm = <T extends FormValues, V>({ defaultState, submitUrl, onSuccess }: UseFormProps<T, V>) => {
    const [data, setData] = useState<T>(defaultState);
    const [errors, setErrors] = useState<Partial<T & ErrorType>>({});
    const [loading, setLoading] = useState<boolean>(false);

    const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setErrors(prev => ({ ...prev, [name]: '' }));
        setData(prev => ({ ...prev, [name]: value }));
    }, []);

    const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post(submitUrl, data);
            if (res.status === 200) {
                if (onSuccess) {
                    onSuccess(res.data)
                    console.log(defaultState)
                    setData(defaultState)
                }
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const err = error?.response?.data || {};
                console.log(err['email'], 'error')
                const newErrors: Partial<T> = {};
                (Object.keys(defaultState) as Array<keyof T>).forEach(key => {
                    if (err[key]) {
                        newErrors[key] = err[key]?.msg || err[key];
                    }
                });
                setErrors(newErrors);
            }
        } finally {
            setLoading(false);
        }
    }, [data, defaultState, onSuccess, submitUrl]);

    return {
        data,
        errors,
        loading,
        handleInputChange,
        handleSubmit,
    };
};

export default useForm;