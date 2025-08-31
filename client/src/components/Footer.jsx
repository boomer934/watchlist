import { useLocation } from "react-router-dom"
import { useRef,useEffect } from "react"
export default function Footer() {

  return (
    <>
        <footer className="relative bottom-0 bg-gray-900/90 p-4 w-full flex justify-center items-center">
            <p className="text-red-500 after:content-[_] after:ml-1">
                <span  className="mr-1">
                    Made with ❤️ by
                </span> 
                <span
                className=" hover:cursor-pointer underline underline-offset-4 focus:text-red-600" 
                onClick={()=>window.open("https://github.com/boomer934","_blank")}>
                    boomer934
                </span>
            </p>
        </footer>
    </>
  )
}
