import {useState} from "react";
import {signUp} from "../../services/UserService.js";

const SignUpComponent = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
    })


    const saveUser = (e) => {
        e.preventDefault();

        if (validateForm()) {
            const user = {username, email, password};

            signUp(user)
                .then(response => {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('refreshToken', response.data.refreshToken);
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

        if (email.trim()) {
            errorsCopy.email = '';
        } else {
            errorsCopy.email = 'Email is required';
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
                <div className="col-md-6 mx-auto">
                    <h2 className='text-center m-3'>Sign Up</h2>
                    <div className="card text-white bg-dark mb-3">
                        <div className="card-body">
                            <form>
                                <div className="form-group mb-2">
                                    <label className='form-label'>Username</label>
                                    <input type="text"
                                           placeholder='Enter username'
                                           name='username'
                                           value={username}
                                           className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                           onChange={(e) => setUsername(e.target.value)}
                                    />
                                    {errors.username && <div className='invalid-feedback'>{errors.username}</div>}
                                </div>

                                <div className="form-group mb-2">
                                    <label className='form-label'>Email</label>
                                    <input type="email"
                                           placeholder='Enter email'
                                           name='email'
                                           value={email}
                                           className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                           onChange={(e) => setEmail(e.target.value)}
                                    />
                                    {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                                </div>

                                <div className="form-group mb-2">
                                    <label className='form-label'>Password</label>
                                    <input type="password"
                                           placeholder='Enter password'
                                           name='password'
                                           value={password}
                                           className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                           onChange={(e) => setPassword(e.target.value)}
                                    />
                                    {errors.password && <div className='invalid-feedback'>{errors.password}</div>}
                                </div>

                                <button className='btn btn-outline-light' onClick={saveUser}>
                                    Sign Up
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpComponent;