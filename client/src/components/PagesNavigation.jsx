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
        <div>
            <ul className="flex flex-row justify-center gap-3">
                <li onClick={()=>goToFirstPage()}>{"<<"}</li>
                <li onClick={()=>goToPrevPage(state.currentPage)}>{"<"}</li>

                <li onClick={()=>goToSelectedPage(state.currentPage)}>{state.currentPage}</li>
                <li onClick={()=>goToSelectedPage(state.currentPage+1)}>{state.currentPage+1}</li>
                <li onClick={()=>goToSelectedPage(state.currentPage+2)}>{state.currentPage+2}</li>
                <li onClick={()=>goToSelectedPage(state.currentPage+3)}>{state.currentPage+3}</li>
                <li onClick={()=>goToSelectedPage(state.currentPage+4)}>{state.currentPage+4}</li>

                <li onClick={()=>goToNextPage(state.currentPage)}>{">"}</li>
                <li onClick={()=>goToLastPage()}>{">>"}</li>
            </ul>
        </div>
    )
}
