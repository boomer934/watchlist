import { useContext, useReducer } from "react"
import { MoviesContext } from "../App"

const ACTIONS = {
    SELECTED: "selected",
    NEXT: "next",
    PREV: "prev",
    FIRST: "first",
    LAST: "last"
}

export default function PagesNavigation({ pageId }) {
    const { movies } = useContext(MoviesContext)

    const initialState = {
        currentPage: Number(pageId),
        totalPages: movies.total_pages
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case ACTIONS.SELECTED:
                return { ...state, currentPage: action.payload }
            case ACTIONS.NEXT:
                if (state.currentPage < state.totalPages) {
                    return { ...state, currentPage: state.currentPage + 1 }
                }
                return state
            case ACTIONS.PREV:
                if (state.currentPage > 1) {
                    return { ...state, currentPage: state.currentPage - 1 }
                }
                return state
            case ACTIONS.FIRST:
                return { ...state, currentPage: 1 }
            case ACTIONS.LAST:
                return { ...state, currentPage: state.totalPages }
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    const goToSelectedPage = (page) => dispatch({ type: ACTIONS.SELECTED, payload: page })
    const goToNextPage = () => dispatch({ type: ACTIONS.NEXT })
    const goToPrevPage = () => dispatch({ type: ACTIONS.PREV })
    const goToFirstPage = () => dispatch({ type: ACTIONS.FIRST })
    const goToLastPage = () => dispatch({ type: ACTIONS.LAST })

    return (
        <div>
            <ul className="flex flex-row justify-center gap-3">
                <li onClick={goToFirstPage}>{"<<"}</li>
                <li onClick={goToPrevPage}>{"<"}</li>

                <li onClick={goToSelectedPage}>{state.currentPage}</li>
                <li onClick={goToSelectedPage}>{state.currentPage+1}</li>

                <li onClick={goToNextPage}>{">"}</li>
                <li onClick={goToLastPage}>{">>"}</li>
            </ul>
        </div>
    )
}
