import Header from "../components/Header"
import Footer from "../components/Footer"
import Blogs from "../components/Blogs";

function Home(){
    return (
        <div className="w-full h-full flex flex-col justify-center items-center gap-y-1">
            <Header/>
            <Blogs/>
            <Footer/>
        </div>
    )
}

export default Home;