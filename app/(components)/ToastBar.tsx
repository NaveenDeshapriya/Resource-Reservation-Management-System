
type props={
    message:string|undefined,
    color:string|undefined,
    visible:boolean
}

export function ToastBar(arg:props) {

    if (!arg.visible)return<></>;

    return (

        
        <div className="w-1/3 h-12 shadow absolute top-2 rounded-sm
                flex justify-center items-center" style={{backgroundColor:arg.color}}>

            <span className="text-md">{arg.message}</span>


        </div>
    )
}