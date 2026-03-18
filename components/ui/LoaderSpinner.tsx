import clsx from "clsx"
import { LoaderIcon } from "lucide-react"

export default function LoaderSpinner(props:{className?:string}) {
    const styleClass = clsx(
        props.className, 
        "animate-spin duration-300 text-primary"
    )
    return (
      <LoaderIcon className={styleClass} />
    )
}