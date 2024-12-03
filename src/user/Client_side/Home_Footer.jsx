import React from "react";
function Footer(){
    return(
        <footer className=" text-center">
            <p className="text-primary">&copy;BlueWaves Beach Resort {new Date().getFullYear()} | Developed by HannSammDev</p>
        </footer>
    );
}
export default Footer