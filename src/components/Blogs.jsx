import { useContext } from "react";
import { AppContext } from "../context/ContextAPI";
import Spinner from "./Spinner";
import Card from "./Card";


function Blogs(){

    // RULE 3 : consume the context
    const {loading, posts}=useContext(AppContext)  // "useContext" hook is used to fetch the data from the created context.Now,You can directly use the variables and functions without passing it in props.

    // here we can make a seperate component <Card/> to display all the details of one blog. but for this, we need to pass "post" of map function as a prop..
    // But in this project, we are avoiding the use of props.Thats why we will write our entire component here itself
    return(
        <div className="w-11/12 max-w-[670px] py-8 flex flex-col gap-y-3 mt-[40px] mb-[70px] justify-center items-center ">
            {   loading? 
                (<Spinner/>) : 
                ( 
                    posts.length===0 ? 
                    (<div>No post Found</div>) : 
                    (posts.map( (post)=> {return <Card key={post.id} post={post}/>}   ))
                )
                
            }
        </div>
    )
}
export default Blogs;