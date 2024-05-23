import { ChangeEvent, useCallback, useEffect, useState } from "react";
type FilePreviewType = {
    data: string,
    callback: (param: File) => void
}
const useFilePreview = ({ data, callback }: FilePreviewType) => {
    const [preview, setPreview] = useState<string | ArrayBuffer | null | undefined>(data)
    useEffect(() => setPreview(data), [data])
    const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files && files.length > 0) {
            const file = files[0];
            callback(file)
            const fileReader = new FileReader;
            fileReader.onload = (eve) => {
                setPreview(eve.target?.result)
            }
            fileReader.readAsDataURL(file)
        }
    }, [callback])

    return { handleFileChange, preview }
}
export default useFilePreview