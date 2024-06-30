import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import OrderService from "../../services/OrderService.js";
import BookTypeService from "../../services/BookTypeService.js";
import BookFormatService from "../../services/BookFormatService.js";
import BigInfoButton from "../UI/buttons/BigInfoButton.jsx";
import SmallInfoButton from "../UI/buttons/SmallInfoButton.jsx";
import LiteButton from "../UI/buttons/LiteButton.jsx";

const OrderUpdateComponent = () => {

    const [bookTypes, setBookTypes] = useState([]);
    const [bookFormats, setBookFormats] = useState([]);

    const [number, setNumber] = useState("");
    const [deadline, setDeadline] = useState("");
    const [comment, setComment] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [updatedAt, setUpdatedAt] = useState("");
    const [finishedAt, setFinishedAt] = useState("");

    const [title, setTitle] = useState("");
    const [authors, setAuthors] = useState("");
    const [files, setFiles] = useState("");
    const [typeId, setTypeId] = useState("");
    const [formatId, setFormatId] = useState("");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const [tasks, setTasks] = useState("");

    const {id} = useParams();

    const navigator = useNavigate();

    const getAllBookTypes = () => {
        BookTypeService.listBookTypes().then((response) => {
            setBookTypes(response.data)
        }).catch(error => {
            console.error(error);
        })
    }

    const getAllBookFormats = () => {
        BookFormatService.listBookFormats().then((response) => {
            setBookFormats(response.data)
        }).catch(error => {
            console.error(error);
        })
    }

    const addNewTask = (id) => navigator(`/tasks/order/${id}/new`);

    const updateTask = (taskId) => navigator(`/tasks/update/${taskId}`);

    useEffect(() => {
        getAllBookTypes();
        getAllBookFormats();
        OrderService.getOrder(id).then(response => {
            setNumber(response.data.number);
            setDeadline(response.data.deadline);
            setComment(response.data.comment);
            setCreatedAt(response.data.createdAt);
            setUpdatedAt(response.data.updatedAt);
            setFinishedAt(response.data.finishedAt);
            setName(response.data.customer.name);
            setEmail(response.data.customer.email);
            setPhone(response.data.customer.phone);
            setTitle(response.data.book.title);
            setAuthors(response.data.book.authors);
            setTasks(response.data.tasks.length === 0 ? [] : response.data.tasks);
        }).catch(errors => console.error(errors))
    }, [id]);

    const saveOrder = (e) => {
        e.preventDefault();

        const order = {
            number, comment, deadline,
            book: {
                title, authors, typeId, formatId
            },
            customer: {
                name, email, phone
            }
        };
        OrderService.updateOrder(id, order)
            .then(result => {
                console.log(result);
                navigator('/orders');
            })
            .catch(errors => console.error(errors));

    }

    const handleFiles = (e) => {
        const files = e.target.files;
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            formData.append('file[' + i + ']', file);
        }
    }

    return (
        <div className='container'>

            <div className="row">
                <div className="col-md-12 mx-auto">
                    <div className="card text-white bg-dark m-3">
                        <form>
                            <div className='d-flex align-items-center justify-content-center'>
                                <h2 className='text-center m-3'>Заказ</h2>
                                <input
                                    type="number"
                                    placeholder='Номер заказа'
                                    name='number'
                                    value={number}
                                    className='form-control w-25'
                                    onChange={(e) => setNumber(e.target.value)}
                                />
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6 mx-auto">
                                        <div className='content container'>

                                            <table className='table table-dark modal-body align-middle'>
                                                <tbody>
                                                <tr>
                                                    <td><span className={'fw-medium'}>Статус: </span></td>
                                                    <td>{status}</td>
                                                </tr>
                                                <tr>
                                                    <td><span className={'fw-medium'}>Сроки:</span></td>
                                                    <td><input type="text" name='deadline'
                                                               value={deadline}
                                                               className='form-control'
                                                               onChange={(e) => setDeadline(e.target.value)}
                                                    /></td>
                                                </tr>
                                                <tr>
                                                    <td><span className={'fw-medium'}>Комментарии: </span></td>
                                                    <td><textarea name='comment'
                                                                  value={comment}
                                                                  cols="56" rows="1"
                                                                  className='p-1'
                                                                  onChange={(e) => setComment(e.target.value)}/></td>
                                                </tr>

                                                {/*Данные издания*/}

                                                <tr>
                                                    <td><p className='header-in-table mt-4 mb-4'>Издание</p></td>
                                                </tr>
                                                <tr>
                                                    <td><span className={'fw-medium'}>Название:</span></td>
                                                    <td><input type="text"
                                                               name='deadline'
                                                               value={title}
                                                               className='form-control'
                                                               onChange={(e) => setTitle(e.target.value)}
                                                    /></td>
                                                </tr>
                                                <tr>
                                                    <td><span className={'fw-medium'}>Авторы:</span></td>
                                                    <td><input type="text"
                                                               name='authors'
                                                               value={authors}
                                                               className='form-control'
                                                               onChange={(e) => setAuthors(e.target.value)}
                                                    /></td>
                                                </tr>
                                                <tr>
                                                    <td><span className={'fw-medium m-1'}>Тип: </span></td>
                                                    <td><select className="form-select"
                                                                value={typeId}
                                                                onChange={(e) => setTypeId(e.target.value)}>
                                                        {bookTypes.map(bookType => (
                                                            // eslint-disable-next-line react/jsx-key
                                                            <option value={bookType.id}
                                                                    key={bookType.id}>{bookType.title}</option>
                                                        ))}
                                                    </select></td>
                                                </tr>
                                                <tr>
                                                    <td><span className={'fw-medium m-1'}>Формат: </span></td>
                                                    <td><select className="form-select"
                                                                value={formatId}
                                                                onChange={(e) => setFormatId(e.target.value)}>
                                                        {bookFormats.map(bookFormat => (
                                                            // eslint-disable-next-line react/jsx-key
                                                            <option value={bookFormat.id}
                                                                    key={bookFormat.id}>{bookFormat.title}</option>
                                                        ))} </select></td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                    </div>
                                    <div className="col-md-6 mx-auto">
                                        <table className='table table-dark'>
                                            <tbody>
                                            <tr>
                                                <td><span className={'fw-medium'}>Поступил в работу: </span></td>
                                                <td>{createdAt ? new Date(createdAt).toLocaleDateString('ru-RU') : '-'}</td>
                                            </tr>
                                            <tr>
                                                <td><span className={'fw-medium'}>Изменен:</span></td>
                                                <td>{updatedAt ? new Date(updatedAt).toLocaleDateString('ru-RU') : '-'}</td>
                                            </tr>
                                            <tr>
                                                <td><span className={'fw-medium'}>Завершен: </span></td>
                                                <td>{finishedAt ? new Date(finishedAt).toLocaleDateString('ru-RU') : '-'}</td>
                                            </tr>

                                            {/*Данные заказчика*/}
                                            <tr>
                                                <td><p className='header-in-table mt-4 mb-4'>Заказчик</p></td>
                                            </tr>
                                            <tr>
                                                <td><span className={'fw-medium'}>ФИО: </span></td>
                                                <td><input type="text"
                                                           name='name'
                                                           value={name}
                                                           className='form-control'
                                                           onChange={(e) => setName(e.target.value)}
                                                /></td>
                                            </tr>
                                            <tr>
                                                <td><span className={'fw-medium'}>E-mail: </span></td>
                                                <td><input type="email"
                                                           name='email'
                                                           value={email}
                                                           className='form-control'
                                                           onChange={(e) => setEmail(e.target.value)}
                                                /></td>
                                            </tr>
                                            <tr>
                                                <td><span className={'fw-medium'}>Телефон: </span></td>
                                                <td><input type="text"
                                                           name='phone'
                                                           value={phone}
                                                           className='form-control'
                                                           onChange={(e) => setPhone(e.target.value)}
                                                /></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <BigInfoButton title="Изменить данные заказа" onClick={saveOrder}/>
                                    </div>
                                </div>


                                {/*Задачи*/}
                                <div className='content container'>
                                    <h3 className='text-center m-3'>Задачи</h3>
                                    <LiteButton title={"Добавить задачу"} onClick={addNewTask}/>
                                    <table className='table table-dark table-striped table-bordered text-center align-middle'>
                                        <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Название</th>
                                            <th>Сотрудник</th>
                                            <th>Статус</th>
                                            <th>Начата</th>
                                            <th>Изменена</th>
                                            <th>Закончена</th>
                                            <th>Действия</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            Array.isArray(tasks) ? tasks.map(task =>
                                                <tr key={task.id}>
                                                    <td>{task.id}</td>
                                                    <td>{task.title}</td>
                                                    <td>{task.username}</td>
                                                    <td>{task.status}</td>
                                                    <td>{task.createdAt ? new Date(task.createdAt).toLocaleDateString('ru-RU') : '-'}</td>
                                                    <td>{task.updatedAt ? new Date(task.updatedAt).toLocaleDateString('ru-RU') : '-'}</td>
                                                    <td>{task.finishedAt ? new Date(task.finishedAt).toLocaleDateString('ru-RU') : '-'}</td>
                                                    <td className='text-center'>
                                                        <SmallInfoButton title="Изменить" onClick={() => updateTask(task.id)}/>
                                                    </td>
                                                </tr>
                                            ) : null
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderUpdateComponent;