import {useState} from "react";
import {useNavigate} from "react-router-dom";
import UserService from "../../services/UserService.js";
import SmallLiteButton from "../UI/buttons/SmallLiteButton.jsx";

const SignInComponent = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
    })

    const navigator = useNavigate();


    const signIn = (e) => {
        e.preventDefault();

        if (validateForm()) {
            const user = {username, password};

            UserService.signIn(user)
                .then(response => {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('refreshToken', response.data.refreshToken);
                    console.log(response.data)
                    navigator('/');
                })
                .catch(errors => console.error(errors));
        }
    }

    function validateForm() {
        let valid = true;
        const errorsCopy = {...errors};

        if (username.trim()) {
            errorsCopy.username = '';
        } else {
            errorsCopy.username = 'Username is required';
            valid = false;
        }

        if (password.trim()) {
            errorsCopy.password = '';
        } else {
            errorsCopy.password = 'Password is required';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    return (

        <div className='container'>
            <div className="row">
                <div className="col-md-4 mx-auto">
                    <h2 className='text-center m-3'>Войти</h2>
                    <div className="card text-white bg-dark mb-3">
                        <div className="card-body text-center">
                            <form>
                                <div className="form-group mb-2">
                                    <label className='form-label'>Username</label>
                                    <input type="text"
                                           placeholder='Enter username'
                                           name='username'
                                           value={username}
                                           className={`form-control text-center ${errors.username ? 'is-invalid' : ''}`}
                                           onChange={(e) => setUsername(e.target.value)}
                                    />
                                    {errors.username && <div className='invalid-feedback'>{errors.username}</div>}
                                </div>

                                <div className="form-group mb-2">
                                    <label className='form-label'>Password</label>
                                    <input type="password"
                                           placeholder='Enter password'
                                           name='password'
                                           value={password}
                                           className={`form-control text-center ${errors.password ? 'is-invalid' : ''}`}
                                           onChange={(e) => setPassword(e.target.value)}
                                    />
                                    {errors.password && <div className='invalid-feedback'>{errors.password}</div>}
                                </div>
                                <SmallLiteButton title="Войти" onClick={signIn}/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInComponent;