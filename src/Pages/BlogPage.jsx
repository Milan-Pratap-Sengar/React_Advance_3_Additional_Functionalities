import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../context/ContextAPI";
import { baseUrl } from "../baseUrl";
import Header from "../components/Header";
import Spinner from "../components/Spinner";
import Card  from "../components/Card";

function BlogPage(){
    const newBaseUrl="https://codehelp-apis.vercel.app/api/"
    const [blog,setBlog]=useState(null);
    const [relatedBlogs,setRelatedBlogs]=useState([])
    const location=useLocation();
    const navigation=useNavigate();
    const blogId=location.pathname.split("/").at(-1)
    const {loading ,setLoading}=useContext(AppContext)

    async function fetchRelatedBlogs() {
        setLoading(true)
        let url=`${newBaseUrl}get-blog?blogId=${blogId}`
        console.log(url)
        try{
            const res=await fetch(url);
            const output=await res.json()
            setBlog(output.blog)
            setRelatedBlogs(output.relatedBlogs);
            
        }
        catch(err){
            console.log(err.message);
            setBlog(null)
            setRelatedBlogs([])
        }
        setLoading(false)
    }

    useEffect(()=>{
        if(blogId){
            fetchRelatedBlogs()
        }
    },[location.pathname])

    return (
        <div className="w-full h-full flex flex-col justify-center items-center gap-y-1">
            <Header/>
            <div>
                <button onClick={()=>navigation(-1)}>Back</button>
            </div>
            {
                loading ? <Spinner/> :
                blog ? 
                (
                    <div className="mt-[7rem] ml-[10rem] w-11/12 max-w-[1000px] mb-[5rem]">
                        <Card post={blog}/>
                        <h2 className="font-bold text-[2rem] mt-[4rem]">Related Blogs</h2>
                        {
                            relatedBlogs.map((post)=>{return <div key={post.id}>
                                                        <Card post={post}/>
                                                    </div>})
                        }
                    </div>
                ) : 
                (<p>No Blog Found</p>)
            }
        </div>
    )
}

export default BlogPage;