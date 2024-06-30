import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import TaskService from "../../../services/TaskService.js";
import UserService from "../../../services/UserService.js";
import SmallLiteButton from "../../UI/buttons/SmallLiteButton.jsx";

const TaskCreateComponent = () => {

    const [title, setTitle] = useState("");
    const [userId, setUserId] = useState("");
    const [users, setUsers] = useState([]);

    const {id} = useParams();

    const [errors, setErrors] = useState({
        title: '',
    })

    const navigator = useNavigate();

    useEffect(() => {
        getAllUsers();
    }, []);

    const getAllUsers = () => {
        UserService.listUsers().then((response) => {
            console.log(response.data);
            setUsers(response.data.length === 0 ? [] : response.data)
        }).catch(error => {
            console.error(error);
        })
    }

    const saveTask = (e) => {
        e.preventDefault();

        if (validateForm()) {
            const task = {title, userId, orderId: id};
            console.log(task)

            TaskService.createTask(task)
                .then(response => {
                    console.log(response.data);
                    navigator('/tasks');
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }

    const validateForm = () => {
        let valid = true;
        const errorsCopy = {...errors};

        if (title.trim()) {
            errorsCopy.title = '';
        } else {
            errorsCopy.title = 'Необходимо ввести название';
            valid = false;
        }
        setErrors(errorsCopy);
        return valid;
    }

    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-4 mx-auto">
                    <div className="card text-white bg-dark m-3">
                        <h2 className='text-center m-3'>Новая задача</h2>
                        <div className="card-body text-center p-3">
                            <form>
                                <div className="form-group mb-4">
                                    <label className='form-label'>Название</label>
                                    <input type="text"
                                           placeholder='Введите название'
                                           name='title'
                                           value={title}
                                           className={`text-center form-control ${errors.title ? 'is-invalid' : ''}`}
                                           onChange={(e) => setTitle(e.target.value)}
                                    />
                                    {errors.title && <div className='invalid-feedback'>{errors.title}</div>}
                                </div>
                                <div className="form-group mb-4">
                                    <label className='form-label'>Сотрудник</label>
                                    <select className="form-select text-center"
                                            value={userId}
                                            onChange={(e) => setUserId(e.target.value)}>
                                        {users.map(user => (
                                            // eslint-disable-next-line react/jsx-key
                                            <option value={user.id}
                                                    key={user.id}>{user.username}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='text-center'>
                                    <SmallLiteButton title="Создать" onClick={saveTask}/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskCreateComponent;