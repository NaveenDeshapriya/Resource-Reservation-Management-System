
type props = {
    className: string,
    rn_id: string,
    status: string,
}

export default function Button(arg: props) {
    return (
        <button className={arg.className} onClick={() => {
           
        }}>{arg.status}</button>
    )
}