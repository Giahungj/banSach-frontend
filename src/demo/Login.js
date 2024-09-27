import { useState } from "react";
function Login() {
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]:value}))
    }

    const [isCheck, setCheck] = useState(false);

    const handleChecked = () => {
        setCheck(!isCheck)
    }

    const handleSubmit = () => {
        
        console.log("Dữ liệu:"+inputs);
    }

    return (
        <form>
            <label>Enter your username:
                <input type="text" name="username" value={inputs.username || ""} onChange={handleChange}/>
            </label><br/>
            <label>Enter your password:
                <input type="text" name="pass" value={inputs.pass || ""} onChange={handleChange}/>
            </label><br/>
            <label>
                <input type="checkbox" checked={isCheck} onChange={handleChecked}/>Is Admin?
            </label><br/>
           <button>Đăng nhập</button>
         </form>
    )
} 
export default Login