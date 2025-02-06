import { useContext, useEffect } from "react"
import { AppContext } from "./context/ContextAPI"
import "./App.css"
import { Route, Routes, useLocation, useSearchParams } from "react-router-dom"
import Home from "./Pages/Home"
import BlogPage from "./Pages/BlogPage"
import TagPage from "./Pages/TagPage"
import CategoryPage from "./Pages/CategoryPage"

export default function App() {

  // we just utilize the context (RULE-3)
  const {FetchBlogData}=useContext(AppContext)
  const [searchParams,setSearchParams]=useSearchParams();
  const location=useLocation(); 

  useEffect(()=>{
    const page=searchParams.get("page") ?? 1;  //if the value does not found then it will store 1 in this variable
    if(location.pathname.includes("tags")){
      // it means we need to display "tags" page
      const tag=location.pathname.split("/").at(-1).replace("-"," ");  // if the URL is "http://codehelp-blogs-context-2/tags/Software-development", then this function will return you "Software development" and replace its hyphen (-) with space (" ")
      FetchBlogData(Number(page),tag) 
    }
    else if(location.pathname.includes("categories")){
      // it means we need to display "category" page
      const category=location.pathname.split("/").at(-1).replace("-"," ");  // if the URL is "http://codehelp-blogs-context-2/tags/Software-development", then this function will return you "Software development" and replace its hyphen (-) with space (" ") 
      FetchBlogData(Number(page),null,category)
    }
    else{
      // it means we need to display Normal page
      FetchBlogData(Number(page))
    }
    
  },[location.pathname,location.search])

  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/blog/:blogId" element={<BlogPage/>}/>       
      <Route path="/tags/:tag" element={<TagPage/>}/>
      <Route path="/categories/:category" element={<CategoryPage/>}/>
    </Routes>
  )
}
