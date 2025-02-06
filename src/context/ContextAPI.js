import { useState } from "react";
import { createContext } from "react";
import {baseUrl} from "../baseUrl"
import {useNavigate } from "react-router-dom";

export const AppContext=createContext();

export default function AppContextProvider({children}){
    const [loading, setLoading]=useState(false);
    const [posts,setPosts]=useState([]);
    const [page,setPage]=useState(1);
    const [totalPages,setTotalPages]=useState(null);
    const navigate=useNavigate()

    const obj={
        loading,
        setLoading,
        posts,
        setPosts,
        page,
        setPage,
        totalPages,
        setTotalPages,
        FetchBlogData,
        changePageHandler
    }


    async function FetchBlogData(page=1,tag=null,category) {
        setLoading(true);
        let url=`${baseUrl}?page=${page}`  // you can get the actual syntax of these URLs from the documentation of API that you are using

        if(tag){
            url += `&tag=${tag}`
        }
        if(category){
            url += `&category=${category}`
        }
        try{
            const res=await fetch(url)  
            const output=await res.json()

            setPage(output.page);
            setPosts(output.posts);
            setTotalPages(output.totalPages)
        }
        catch(err){
            console.log("Error while fetching data")
            setPage(1);
            setPosts([])
            setTotalPages(null)
        }
        setLoading(false)
    }

    function changePageHandler(page){
        navigate({ search : `?page=${page}`})
        setPage(page)
    }

    return <AppContext.Provider value={obj}> {children}</AppContext.Provider>
}