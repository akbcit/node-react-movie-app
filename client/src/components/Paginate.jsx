import { useContext } from "react";
import { MovieContext } from "../context/MovieContext";
import "../assets/styles/Paginate.css";

function Paginate(){
    const { pageNum, setPageNum } = useContext(MovieContext);

    const pageScroll = (type)=>{
        let newPageNum = pageNum;
        if(type==="prev" && pageNum>1){
            --newPageNum;
            setPageNum(newPageNum);
        }
        if(type==="next"){
            ++newPageNum;
            setPageNum(newPageNum);
        }
    }

    return (
        <div id="pagination-block">
            <p id="prev-page" className={pageNum===1?"inactive-page-scroll":"active-page-scroll"} onClick={()=>{pageScroll("prev")}} >&lt;</p>
            <p id="current-page">{pageNum}</p>
            <p id="next-page" className="active-page-scroll" onClick={()=>{pageScroll("next")}} >&gt;</p>
        </div>
    )
}

export default Paginate;