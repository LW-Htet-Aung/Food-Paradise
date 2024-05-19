import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

export default function _twMerge (defaultClass:string,bindClasses:string | undefined,conditionClasses?:string) {
    return twMerge(clsx(defaultClass,bindClasses,conditionClasses));
}