
export default function Filter({filterBy,setFilterBy}){

    return(
        <>
            <div className="relative w-auto flex flex-row justify-center items-center gap-1">
                <h2>Ordina per </h2>
                <div className=" relative w-auto">
                    <select 
                    className="p-1 bg-gray-300" 
                    onChange={(e)=>setFilterBy(e.target.value)} 
                    value={filterBy}>
                        <option value="popular">Popolarità</option>
                        <option value="top_rated">Più votati </option>
                        <option value="upcoming">In arrivo</option>
                    </select>
                </div>
            </div>
        </>
    )
}