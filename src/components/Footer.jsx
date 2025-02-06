import { useContext } from "react";
import { AppContext } from "../context/ContextAPI";

function Footer(){

    // RULE-3 : consume the context
    const {page, totalPages, changePageHandler}=useContext(AppContext)
    return(
        <div className="w-full flex justify-center items-center border-2 py-2 fixed bottom-[0px] bg-white">
            <div className="flex justify-between w-full max-w-[670px]">
                <div className="flex gap-x-2">
                    {
                        page > 1 && <button className="rounded-md border-2 px-4 py-1" onClick={()=>changePageHandler(page-1)}>Previous</button>
                    }

                    {
                        page < totalPages && <button className="rounded-md border-2 px-4 py-1" onClick={()=>changePageHandler(page+1)}>Next</button>
                    }
                </div>
                <p className="font-bold text-sm">Page {page} of {totalPages}</p>
            </div>
        </div>
    )
}
export default Footer;