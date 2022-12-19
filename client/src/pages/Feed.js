import React from "react";
import InklingList from "../components/InklingList";
import InklingForm from "../components/InklingForm";
import Footer from "../components/Footer";

function Feed(){
    return(
        <div>
        <main>
        <h1>Feed</h1>
        <div>
        <InklingForm></InklingForm>
        </div>
        <InklingList></InklingList>
        </main>
        </div>
    )
}
export default Feed;