import { useEffect, useRef } from "react";

type props = {
    message: string | undefined,
    color: string | undefined,
    visible: boolean,
    closeToast: () => void
}

export function ToastBar(arg: props) {

    if (!arg.visible) return <></>;

    const timmer = useRef<ReturnType<typeof setTimeout> | null>(null);


    useEffect(() => {
        timmer.current = setTimeout(() => {
            arg.closeToast();

        }, 1200);
        return () => clearTimeout(timmer.current ? timmer.current : "");


    }, []);

    return (


        <div className="w-1/3 h-12 shadow absolute top-2 rounded-sm
                flex justify-center items-center" style={{ backgroundColor: arg.color }}>

            <span className="text-md">{arg.message}</span>


        </div>
    )
}