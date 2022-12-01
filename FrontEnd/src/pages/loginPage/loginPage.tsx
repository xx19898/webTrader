
 const LoginPage = () => {
    
    return(
        <div className="w-auto h-screen bg-secondary/50 flex flex-row justify-center items-center">
            <form className="flex pt-5 pb-12 flex-col justify-between text-center px-6 items-start text-black h-auto w-auto bg-white border-white rounded-sm border-solid border-2">
                <h1 className="text-center font-medium mx-auto ">Login</h1>
                <label>Username</label>
                <input className="shadow-lg" type="text"></input>
                <label className="mt-2">Password</label>
                <input className="shadow-lg" type="password"></input>
                <a className="decoration-solid text-blue-400 mt-4 mx-auto" href="url">I forgot password</a>
                
                    
            </form>
        </div>
    )
}

export default LoginPage