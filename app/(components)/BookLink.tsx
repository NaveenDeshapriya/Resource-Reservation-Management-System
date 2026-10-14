import Link from "next/link"

type props = {
    className: string,
    status: string

}

export default function BookLink(arg: props) {
    return (
        <Link className={arg.className} href={"/reservation"}>{arg.status}</Link>
    )
}