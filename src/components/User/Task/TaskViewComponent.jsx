import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import TaskService from "../../../services/TaskService.js";
import BigInfoButton from "../../UI/buttons/BigInfoButton.jsx";
import UserService from "../../../services/UserService.js";

const TaskViewComponent = () => {

    const [book, setBook] = useState([]);
    const [user, setUser] = useState([]);
    const [customer, setCustomer] = useState([]);

    // Заказ
    const [orderStatus, setOrderStatus] = useState([]);
    const [orderCreatedAt, setOrderCreatedAt] = useState([]);
    const [orderUpdatedAt, setOrderUpdatedAt] = useState([]);
    const [orderFinishedAt, setOrderFinishedAt] = useState([]);
    const [deadline, setDeadline] = useState([]);
    const [orderId, setOrderId] = useState([]);
    const [number, setNumber] = useState([]);

    // Задача
    const [title, setTitle] = useState([]);
    const [status, setStatus] = useState([]);
    const [createdAt, setCreatedAt] = useState([]);
    const [updatedAt, setUpdatedAt] = useState([]);
    const [finishedAt, setFinishedAt] = useState([]);

    const navigator = useNavigate();

    const {id} = useParams();

    useEffect(() => {
        TaskService.getTask(id)
            .then((response) => {
                setBook(response.data.order.book)
                setUser(response.data.user)
                setCustomer(response.data.order.customer)
                setTitle(response.data.title);
                setStatus(response.data.status);
                setCreatedAt(response.data.createdAt)
                setUpdatedAt(response.data.updatedAt)
                setFinishedAt(response.data.finishedAt)
                setOrderStatus(response.data.order.status)
                setNumber(response.data.order.number)
                setDeadline(response.data.order.deadline)
                setOrderCreatedAt(response.data.order.createdAt)
                setOrderUpdatedAt(response.data.order.updatedAt)
                setOrderFinishedAt(response.data.order.finishedAt)
            })
            .catch()
    }, [id]);


    const completeTask = (id) => {
        TaskService.completeTask(id)
            .then(response => {
                console.log(response.data);
                navigator('/');
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-12 mx-auto">
                    <div className="card text-white bg-dark m-3">
                        <h2 className='text-center m-3'>{title}</h2>

                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6 mx-auto">
                                    <div className='content container'>
                                        <div><span className={'fw-medium'}>Статус: </span>{status}</div>
                                    </div>
                                    <div className='content container'>
                                        <div><span className={'fw-medium'}>Поступила в работу: </span>
                                            {createdAt ? new Date(createdAt).toLocaleDateString('ru-RU') : '-'}
                                        </div>
                                        <div><span className={'fw-medium'}>Изменена: </span>
                                            {updatedAt ? new Date(updatedAt).toLocaleDateString('ru-RU') : '-'}
                                        </div>
                                        <div><span className={'fw-medium'}>Завершена: </span>
                                            {finishedAt ? new Date(finishedAt).toLocaleDateString('ru-RU') : '-'}
                                        </div>
                                    </div>
                                    {/*Данные исполнителя*/}

                                    <div className='content container'>
                                        <h3 className='text-center m-3'>Сотрудник</h3>
                                        <div><span className={'fw-medium'}>ФИО: </span>{user.username}</div>
                                        <div><span className={'fw-medium'}>Должность: </span>{user.position}</div>
                                        <div><span className={'fw-medium'}>E-mail: </span>{user.email}</div>
                                        <div><span className={'fw-medium'}>Телефон: </span>{user.phone}</div>
                                    </div>
                                </div>
                                {/*Данные заказа*/}
                                <div className="col-md-6 mx-auto">
                                    <div className='content container'>
                                        <h3 className='text-center m-3'>Заказ</h3>
                                        <div><span className={'fw-medium'}>Номер: </span>{number}</div>
                                        <div><span className={'fw-medium'}>Статус: </span>{orderStatus}</div>
                                        <div><span className={'fw-medium'}>Сроки: </span>{deadline}</div>
                                        <div><span className={'fw-medium'}>Поступил в работу: </span>
                                            {orderCreatedAt ? new Date(orderCreatedAt).toLocaleDateString('ru-RU') : '-'}
                                        </div>
                                        <div><span className={'fw-medium'}>Изменен: </span>
                                            {orderUpdatedAt ? new Date(orderUpdatedAt).toLocaleDateString('ru-RU') : '-'}
                                        </div>
                                        <div><span className={'fw-medium'}>Завершен: </span>
                                            {orderFinishedAt ? new Date(orderFinishedAt).toLocaleDateString('ru-RU') : '-'}
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
                            {UserService.getUsername() === user.username && <div className='text-center'>
                            <BigInfoButton title='Готово' onClick={() => completeTask(id)}/>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TaskViewComponent;