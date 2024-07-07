import {useEffect, useState} from "react"
import {useNavigate, useParams} from "react-router-dom"
import TaskService from "../../../services/TaskService.js"
import SmallLiteButton from "../../UI/buttons/SmallLiteButton.jsx";

export const TaskUpdateComponent = () => {

    const [title, setTitle] = useState("")
    const [userId, setUserId] = useState("")
    const [orderId, setOrderId] = useState("")

    const {id} = useParams();

    const [errors, setErrors] = useState({
        title: '',
    })

    const navigator = useNavigate();

    useEffect(() => {
        TaskService.getTask(id).then(response => {
            setTitle(response.data.task.title);
            setUserId(response.data.user.id);
            setOrderId(response.data.order.id);
        }).catch(errors => console.error(errors))
    }, [id]);

    const updateTask = (e) => {
        e.preventDefault();

        if (validateForm()) {
            const task = {title, userId, orderId};

            TaskService.updateTask(id, task)
                .then(() => {
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
                        <h2 className='text-center m-3'>Изменить задачу</h2>
                        <div className="card-body text-center">
                            <form>
                                <div className="form-group mb-2">
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
                                <div className='text-center'>
                                    <SmallLiteButton title="Изменить" onClick={updateTask}/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}