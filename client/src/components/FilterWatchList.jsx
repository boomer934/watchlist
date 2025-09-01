
export default function FilterWatchList({filter,setFilter}) {
    
  return (
    <>
        <div className="flex flex-row items-center justify-center m-4 gap-3 text-md">
  <p className="font-medium text-gray-700">Filtra per:</p>
  <select
    name="filter"
    value={filter}
    onChange={(e) => setFilter(e.target.value)}
    className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition ease-in-out duration-150 hover:bg-gray-300 cursor-pointer"
  >
    <option value="tutti">Tutti</option>
    <option value="da vedere">Da vedere</option>
    <option value="visto">Visto</option>
  </select>
</div>

    </>
  )
}
