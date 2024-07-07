import UserService from "../services/UserService.js";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import TaskService from "../services/TaskService.js";
import SmallLiteButton from "./UI/buttons/SmallLiteButton.jsx";
import Expire from "./UI/Expire.jsx";

const MainComponent = () => {

    const [tasks, setTasks] = useState([]);

    const navigator = useNavigate();

    useEffect(() => {
        if (UserService.isAuthenticated()) {
            TaskService.getCurrentUserTasks().then((response) => {
                setTasks(response.data.length === 0 ? [] : response.data);
            }).catch(error => {
                console.error(error);
            })
        }
    }, []);

    const viewTask = (id) => navigator(`/tasks/${id}`);

    return (
        <div className='content'>
            <Expire delay={1000}>
                {UserService.isAuthenticated() &&
                    <h4 className='expire-div text-center mt-5'>Привет, {UserService.getUsername()}!</h4>}
            </Expire>
            {!UserService.isAuthenticated() &&
                <h4 className='text-center mt-5'>Пожалуйста, аутентифицируйтесь для доступа к системе</h4>}

            {UserService.isAuthenticated() && <div className='content container'>
                <h2 className='text-center mt-5 mb-3'>{tasks.length > 0 ? 'Задачи' : 'Для Вас пока нет задач'}</h2>
                {tasks.length > 0 &&<table className='table table-dark table-striped table-bordered text-center align-middle'>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Название</th>
                        <th>№ заказа</th>
                        <th>Статус</th>
                        <th>Создана</th>
                        <th>Изменена</th>
                        <th>Завершена</th>
                        <th colSpan="1">Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        tasks.map(task =>
                            <tr key={task.task.id}>
                                <td>{task.task.id}</td>
                                <td>{task.task.title}</td>
                                <td>{task.orderNumber}</td>
                                <td>{task.task.status}</td>
                                <td>{task.task.createdAt ? new Date(task.task.createdAt).toLocaleDateString('ru-RU') : '-'}</td>
                                <td>{task.task.updatedAt ? new Date(task.task.updatedAt).toLocaleDateString('ru-RU') : '-'}</td>
                                <td>{task.task.finishedAt ? new Date(task.task.finishedAt).toLocaleDateString('ru-RU') : '-'}</td>
                                <td>
                                    <SmallLiteButton title="Подробнее" onClick={() => viewTask(task.task.id)}/>
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>}
            </div>}
        </div>
    );
};
export default MainComponent;