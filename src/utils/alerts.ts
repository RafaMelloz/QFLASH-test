import toast from "react-hot-toast";

export function sucessAlert(message : string) {
    return toast.success(message , {
        position: 'top-right',
        duration: 2000
    });
}

export function errorAlert(message : string) {
    return toast.error(message , {
        position: 'top-right',
        duration: 2000
    });
}

export const loadingAlert = (msgLoading: string, promise: Promise<any>, msgSucess: string, msgError: string ) => {
    toast.promise(promise,
        {
            loading: msgLoading,
            success: msgSucess,
            error: msgError,	
            // success: (data: any) => data.data.message,
            // error: (err) => err.response.data.message,
        },
        {
            position: 'top-right',
            duration: 3000
        }
    );
}
