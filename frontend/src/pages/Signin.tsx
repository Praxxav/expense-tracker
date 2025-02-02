import { Auth } from "../components/Auth"

import React from "react"
export const Signin = () => {
    return <div>
        <div className="justify-center items-center flex h-screen">
            <div>
                <Auth type="signin" />
            </div>
           
           
        </div>
    </div>
}