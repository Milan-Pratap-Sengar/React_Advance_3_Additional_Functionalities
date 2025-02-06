import {useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Blogs from "../components/Blogs";
import Footer from "../components/Footer";

function TagPage(){
    const navigation=useNavigate();
    const location=useLocation();
    const tag=location.pathname.split("/").at(-1); // we will fetch this tag from URL so that we can display it in our UI in <h2> tag
    return (
        <div className="w-full h-full flex flex-col justify-center items-center gap-y-1">
            <Header/>
            <div className=" w-[35vw] flex text-black items-center mb-[-50px]">
                <button className="mt-[100px] p-2 border shadow-md mb-[15px] ml-[-65px]" onClick={()=>navigation(-1)}> Back </button>
                <h2 className="font-bold pt-[5rem] ml-[10rem]"> Blogs Tagged <span className="font-bold">#{tag}</span></h2>
            </div>
            <Blogs/>
            <Footer/>
        </div>
    )
}

export default TagPage;
