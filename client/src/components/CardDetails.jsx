
import { useLocation } from "react-router-dom"
export default function CardDetails(){

    const movie = useLocation().state?.movie

    return (
        <>
            <h1>
                CardDetails
            </h1>
        </>
    )
}