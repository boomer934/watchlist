
export default function DropDownProfile(){
    return(
      <>
      <div className="bg-gray-700 absolute right-9 top-14 w-12 h-12 rotate-[45deg]"></div>
        <div className=" flex flex-col absolute bg-gray-700 text-white shadow-md right-6 top-15 rounded-2xl p-3 z-20 cursor-pointer">
            <ul className=" flex flex-col gap-4">
                {/* <li>Logout</li> */}
                <li>Profile</li>
                <li>Settings</li>
            </ul>
        </div>
      </>
    )
}