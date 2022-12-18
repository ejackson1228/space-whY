import React from "react";
import InklingList from "../components/InklingList";
import InklingForm from "../components/InklingForm";
import Footer from "../components/Footer";

function Feed(){
    return(
        <div>
        <Header></Header>
        <main>
        <h1>Feed</h1>
        <div>
        <InklingForm></InklingForm>
        </div>
        <InklingList></InklingList>
        </main>
        <Footer></Footer>
        </div>
    )
}
export default Feed;