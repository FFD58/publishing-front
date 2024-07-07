import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import TaskService from "../../../services/TaskService.js";
import SmallInfoButton from "../../UI/buttons/SmallInfoButton.jsx";
import SmallDangerButton from "../../UI/buttons/SmallDangerButton.jsx";
import UserService from "../../../services/UserService.js";
import SmallLiteButton from "../../UI/buttons/SmallLiteButton.jsx";

const TaskListComponent = () => {

    const [tasks, setTasks] = useState([]);

    const navigator = useNavigate();

    useEffect(() => {
        getAllTasks();
    }, []);

    const getAllTasks = () => {
        TaskService.listTasks().then((response) => {
            console.log(response.data);
            setTasks(response.data.length === 0 ? [] : response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    const updateTask = (id) => navigator(`/tasks/update/${id}`);

    const removeTask = (id) => {
        if (confirm("Вы уверены?")) {
            TaskService.deleteTask(id)
                .then(response => {
                    console.log(response.data.token);
                    getAllTasks();
                })
                .catch(errors => console.error(errors));
        }
    }

    const viewTask = (id) => navigator(`/tasks/${id}`);


    return (
        <div className='content container'>
            <h2 className='text-center m-3'>Задачи сотрудников</h2>
            <table className='table table-dark table-striped table-bordered text-center align-middle'>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Название</th>
                    <th>ФИО сотрудника</th>
                    <th>№ заказа</th>
                    <th>Статус</th>
                    <th>Создана</th>
                    <th>Изменена</th>
                    <th>Завершена</th>
                    {UserService.isUser() && <th colSpan="1">Действия</th>}
                    {UserService.isAdmin() && <th colSpan="3">Действия</th>}
                </tr>
                </thead>
                <tbody>
                {
                    tasks.map(task =>
                        <tr key={task.task.id}>
                            <td>{task.task.id}</td>
                            <td>{task.task.title}</td>
                            <td>{task.username}</td>
                            <td>{task.orderNumber}</td>
                            <td>{task.task.status}</td>
                            <td>{task.task.createdAt ? new Date(task.createdAt).toLocaleDateString('ru-RU') : '-'}</td>
                            <td>{task.task.updatedAt ? new Date(task.updatedAt).toLocaleDateString('ru-RU') : '-'}</td>
                            <td>{task.task.finishedAt ? new Date(task.finishedAt).toLocaleDateString('ru-RU') : '-'}</td>
                            <td>
                                <SmallLiteButton title="Подробнее" onClick={() => viewTask(task.task.id)}/>
                            </td>
                            {UserService.isAdmin() && <td>
                                <SmallInfoButton title="Изменить" onClick={() => updateTask(task.task.id)}/>
                            </td>}
                            {UserService.isAdmin() && <td>
                                <SmallDangerButton title="Удалить" onClick={() => removeTask(task.task.id)}/>
                            </td>}
                        </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    )
}
export default TaskListComponent;