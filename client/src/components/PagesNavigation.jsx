import { useContext, useReducer, useEffect, useRef } from "react"
import { MoviesContext } from "../App"
import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { MovieTitleContext } from "../App"

const ACTIONS = {
    SELECTED: "selected",
    NEXT: "next",
    PREV: "prev",
    FIRST: "first",
    LAST: "last"
}

const reducer = (state,action) =>{
    switch(action.type){
        case ACTIONS.SELECTED:
            return{
                ...state,
                currentPage:action.payload.currentPage
            }
        case ACTIONS.NEXT:
            return{
                ...state,
                currentPage: state.currentPage+1 >= state.totalPages ? state.currentPage : state.currentPage+1
            }
        case ACTIONS.PREV:
            return{
                ...state,
                currentPage: state.currentPage-1 <= 0 ? state.currentPage : state.currentPage-1
            }
            case ACTIONS.FIRST:
            return{
                ...state,
                currentPage:1
            }
            case ACTIONS.LAST:
                return{
                    ...state,
                    currentPage: action.currentPage
                }
        default:
            return state
    }
}

export default function PagesNavigation({ pageId , movieTitleParam = "" }) {
    const location = useLocation()
    pageId = Number(pageId)
    const navigate = useNavigate()
    const { movies ,setMovies } = useContext(MoviesContext)

    const initialState = {
        currentPage: pageId,
        totalPages: movies.total_pages
    }

    
    const [state,dispatch] = useReducer(reducer,initialState)
    
    const goToSelectedPage = (pageId)=>{
        console.log(pageId)
        setMovies({...movies,page:pageId})
        dispatch({type:ACTIONS.SELECTED,payload:{currentPage:pageId}})
    }

    const goToNextPage = (pageId)=>{
        setMovies({...movies,page:pageId})
        dispatch({type:ACTIONS.NEXT,currentPage:pageId})
        
    }

    const goToPrevPage = (pageId)=>{
        setMovies({...movies,page:pageId})
        dispatch({type:ACTIONS.PREV,currentPage:pageId})
    }

    const goToFirstPage = ()=>{
        setMovies({...movies,page:1})
        dispatch({type:ACTIONS.FIRST,currentPage:pageId})
    }

    const goToLastPage=()=>{
        setMovies({...movies,page:initialState.totalPages})
        dispatch({type:ACTIONS.LAST,currentPage:initialState.totalPages})
    }

    useEffect(() => {
        setMovies(movies)
        if (location.pathname.includes("/home/page")) {
            navigate(`/home/page/${state.currentPage}`, { state: movies });
        } else if (location.pathname.includes("/home/search")) {
            navigate(`/home/search/${movieTitleParam}/${state.currentPage}`);
        }
    }, [state.currentPage]);
    

    return (
        <div className="w-full flex justify-center py-6">
            <div className="flex items-center gap-2 sm:gap-3">
                {/* First Page Button */}
                <button 
                    onClick={() => goToFirstPage()}
                    className="flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 text-gray-400 hover:text-white bg-gray-800/60 hover:bg-gray-700/80 border border-gray-600/40 hover:border-gray-500/60 rounded-md transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                >
                    <span className="text-xs sm:text-sm font-medium">{"<<"}</span>
                </button>
                
                {/* Previous Page Button */}
                <button 
                    onClick={() => goToPrevPage(state.currentPage)}
                    className="flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 text-gray-400 hover:text-white bg-gray-800/60 hover:bg-gray-700/80 border border-gray-600/40 hover:border-gray-500/60 rounded-md transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                >
                    <span className="text-xs sm:text-sm font-medium">{"<"}</span>
                </button>
                
                {/* Page Numbers Container */}
                <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 bg-gray-900/70 border border-gray-600/50 rounded-lg backdrop-blur-md shadow-2xl">
                    {/* Current Page - Always visible */}
                    <button 
                        onClick={() => goToSelectedPage(state.currentPage)}
                        className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 text-white rounded-md font-semibold text-sm sm:text-base transform scale-110"
                    >
                        {state.currentPage}
                    </button>
                    
                    {/* Next Pages - Progressive visibility */}
                    <button 
                        onClick={() => goToSelectedPage(state.currentPage + 1)}
                        className="hidden sm:flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 text-gray-300 hover:text-white bg-gray-800/50 hover:bg-gray-700/70 border border-gray-600/30 hover:border-gray-500/50 rounded-md transition-all duration-300 font-medium text-sm sm:text-base hover:scale-105"
                    >
                        {state.currentPage + 1}
                    </button>
                    
                    <button 
                        onClick={() => goToSelectedPage(state.currentPage + 2)}
                        className="hidden md:flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 text-gray-300 hover:text-white bg-gray-800/50 hover:bg-gray-700/70 border border-gray-600/30 hover:border-gray-500/50 rounded-md transition-all duration-300 font-medium text-sm sm:text-base hover:scale-105"
                    >
                        {state.currentPage + 2}
                    </button>
                    
                    <button 
                        onClick={() => goToSelectedPage(state.currentPage + 3)}
                        className="hidden lg:flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 text-gray-300 hover:text-white bg-gray-800/50 hover:bg-gray-700/70 border border-gray-600/30 hover:border-gray-500/50 rounded-md transition-all duration-300 font-medium text-sm sm:text-base hover:scale-105"
                    >
                        {state.currentPage + 3}
                    </button>
                    
                    <button 
                        onClick={() => goToSelectedPage(state.currentPage + 4)}
                        className="hidden xl:flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 text-gray-300 hover:text-white bg-gray-800/50 hover:bg-gray-700/70 border border-gray-600/30 hover:border-gray-500/50 rounded-md transition-all duration-300 font-medium text-sm sm:text-base hover:scale-105"
                    >
                        {state.currentPage + 4}
                    </button>
                </div>
                
                {/* Next Page Button */}
                <button 
                    onClick={() => goToNextPage(state.currentPage)}
                    className="flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 text-gray-400 hover:text-white bg-gray-800/60 hover:bg-gray-700/80 border border-gray-600/40 hover:border-gray-500/60 rounded-md transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                >
                    <span className="text-xs sm:text-sm font-medium">{">"}</span>
                </button>
                
                {/* Last Page Button */}
                <button 
                    onClick={() => goToLastPage()}
                    className="flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 text-gray-400 hover:text-white bg-gray-800/60 hover:bg-gray-700/80 border border-gray-600/40 hover:border-gray-500/60 rounded-md transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                >
                    <span className="text-xs sm:text-sm font-medium">{">>"}</span>
                </button>
            </div>
        </div>
    )
}
