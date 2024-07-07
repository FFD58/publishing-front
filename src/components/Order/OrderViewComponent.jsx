import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import OrderService from "../../services/OrderService.js";
import BigLiteButton from "../UI/buttons/BigLiteButton.jsx";
import SmallInfoButton from "../UI/buttons/SmallInfoButton.jsx";
import LiteButton from "../UI/buttons/LiteButton.jsx";
import UserService from "../../services/UserService.js";
import SmallLiteButton from "../UI/buttons/SmallLiteButton.jsx";

const OrderViewComponent = () => {

    const [orderId, setOrderId] = useState("");
    const [number, setNumber] = useState("");
    const [deadline, setDeadline] = useState("");
    const [comment, setComment] = useState("");
    const [status, setStatus] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [updatedAt, setUpdatedAt] = useState("");
    const [finishedAt, setFinishedAt] = useState("");

    const [book, setBook] = useState("");
    const [customer, setCustomer] = useState("");
    const [tasks, setTasks] = useState("");

    const {id} = useParams();

    const navigator = useNavigate();

    const addNewTask = (orderId) => navigator(`/tasks/order/${orderId}/new`);

    const updateOrder = (orderId) => navigator(`/orders/update/${orderId}`);

    const updateTask = (taskId) => navigator(`/tasks/update/${taskId}`);

    useEffect(() => {
        OrderService.getOrder(id).then(response => {
            setOrderId(response.data.order.order.id);
            setNumber(response.data.order.order.number);
            setDeadline(response.data.order.order.deadline);
            setComment(response.data.order.order.comment);
            setStatus(response.data.order.order.status);
            setCreatedAt(response.data.order.order.createdAt);
            setUpdatedAt(response.data.order.order.updatedAt);
            setFinishedAt(response.data.order.order.finishedAt);

            setCustomer(response.data.order.customer);
            setBook(response.data.order.book);

            setTasks(response.data.tasks.length === 0 ? [] : response.data.tasks);

        }).catch(errors => console.error(errors))
    }, [id]);

    const viewTask = (id) => navigator(`/tasks/${id}`);

    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-12 mx-auto">
                    <div className="card text-white bg-dark m-3">
                        <h2 className='text-center m-3'>Заказ {number ? "№ " + number : ""}
                            {UserService.isAdmin() && <BigLiteButton
                                title="Изменить данные заказа"
                                onClick={() => updateOrder(orderId)}
                                style="btn-outline-light"
                            />}
                        </h2>

                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6 mx-auto">
                                    <div className='content container'>
                                        <div><span className={'fw-medium'}>Статус: </span>{status}</div>
                                        <div><span className={'fw-medium'}>Сроки: </span>
                                            {deadline ? new Date(deadline).toLocaleDateString('ru-RU') : '-'}
                                        </div>
                                        <div><span className={'fw-medium'}>Комментарии: </span>{comment}</div>
                                    </div>
                                </div>
                                <div className="col-md-6 mx-auto">
                                    <div className='content container'>
                                        <div><span className={'fw-medium'}>Поступил в работу: </span>
                                            {createdAt ? new Date(createdAt).toLocaleDateString('ru-RU') : '-'}
                                        </div>
                                        <div><span className={'fw-medium'}>Изменен: </span>
                                            {updatedAt ? new Date(updatedAt).toLocaleDateString('ru-RU') : '-'}
                                        </div>
                                        <div><span className={'fw-medium'}>Завершен: </span>
                                            {finishedAt ? new Date(finishedAt).toLocaleDateString('ru-RU') : '-'}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/*Данные издания*/}
                            <div className="row">
                                <div className="col-md-6 mx-auto">
                                    <div className='content container'>
                                        <h3 className='text-center m-3'>Издание</h3>
                                        <div><span className={'fw-medium'}>Название: </span>{book.title}</div>
                                        <div><span className={'fw-medium'}>Авторы: </span>{book.authors}</div>
                                        <div><span className={'fw-medium'}>Тип: </span>{book.type}</div>
                                        <div><span className={'fw-medium'}>Формат: </span>{book.format}</div>
                                    </div>
                                </div>

                                {/*Данные заказчика*/}
                                <div className="col-md-6 mx-auto">
                                    <div className='content container'>
                                        <h3 className='text-center m-3'>Заказчик</h3>
                                        <div><span className={'fw-medium'}>ФИО: </span>{customer.name}</div>
                                        <div><span className={'fw-medium'}>E-mail: </span>{customer.email}</div>
                                        <div><span className={'fw-medium'}>Телефон: </span>{customer.phone}</div>
                                    </div>
                                </div>
                            </div>

                            {/*Задачи*/}
                            <div className='content container'>
                                <h3 className='text-center m-3'>Задачи</h3>
                                {UserService.isAdmin() && <LiteButton title="Добавить задачу" onClick={() => addNewTask(orderId)}/>}
                                {tasks.length > 0 && <table className='table table-dark table-striped table-bordered text-center align-middle'>
                                    <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Название</th>
                                        <th>Сотрудник</th>
                                        <th>Статус</th>
                                        <th>Начата</th>
                                        <th>Изменена</th>
                                        <th>Закончена</th>
                                        {UserService.isUser() && <th colSpan="1">Действия</th>}
                                        {UserService.isAdmin() && <th colSpan="2">Действия</th>}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        Array.isArray(tasks) ? tasks.map(task =>
                                            <tr key={task.task.id}>
                                                <td>{task.task.id}</td>
                                                <td>{task.task.title}</td>
                                                <td>{task.username}</td>
                                                <td>{task.task.status}</td>
                                                <td>{task.task.createdAt ? new Date(task.task.createdAt).toLocaleDateString('ru-RU') : '-'}</td>
                                                <td>{task.task.updatedAt ? new Date(task.task.updatedAt).toLocaleDateString('ru-RU') : '-'}</td>
                                                <td>{task.task.finishedAt ? new Date(task.task.finishedAt).toLocaleDateString('ru-RU') : '-'}</td>
                                                <td>
                                                    <SmallLiteButton title="Подробнее"
                                                                     onClick={() => viewTask(task.task.id)}/>
                                                </td>
                                                {UserService.isAdmin() && <td>
                                                    <SmallInfoButton title="Изменить"
                                                                     onClick={() => updateTask(task.task.id)}/>
                                                </td>}

                                            </tr>
                                        ) : null
                                    }
                                    </tbody>
                                </table>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderViewComponent;