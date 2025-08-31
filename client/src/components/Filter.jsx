import { useRef, useState } from "react"
export default function Filter({filterBy,setFilterBy}){

    const [isOpen,setIsOpen] = useState(false)
    const boxRef = useRef(null);    

   const toggleArrow =() => {
       setIsOpen((prev)=>!prev)
   }

    return(
        <>
            <div className="relative w-auto flex flex-row justify-center items-center gap-1">
                <h2>Ordina per </h2>
                <select 
                onClick={toggleArrow}
                className="p-1 bg-gray-300 appearance-none" 
                onChange={(e)=>setFilterBy(e.target.value)} 
                value={filterBy}>
                    <option value="popular">Popolarità</option>
                    <option value="top_rated">Più votati </option>
                    <option value="upcoming">In arrivo</option>
                </select>
                <div 
                ref={boxRef} 
                className="absolute top-[15px] right-[98px] w-3 h-3 border-l-1 border-t-1 border-black rotate-45"
                style={{transform: isOpen ? "rotate(180deg)" : "rotate(0deg)"}}
                ></div>
            </div>
            
        </>
    )
}