import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import OrderService from "../../services/OrderService.js";
import BookTypeService from "../../services/BookTypeService.js";
import BookFormatService from "../../services/BookFormatService.js";
import BigInfoButton from "../UI/buttons/BigInfoButton.jsx";
import SmallInfoButton from "../UI/buttons/SmallInfoButton.jsx";
import InfoButton from "../UI/buttons/InfoButton.jsx";
import LiteButton from "../UI/buttons/LiteButton.jsx";
import UploadFilesService from "../../services/UploadFilesService.js";

const OrderUpdateComponent = () => {

    const [bookTypes, setBookTypes] = useState([]);
    const [bookFormats, setBookFormats] = useState([]);

    const [orderId, setOrderId] = useState("");
    const [number, setNumber] = useState("");
    const [status, setStatus] = useState("");
    const [deadline, setDeadline] = useState("");
    const [comment, setComment] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [updatedAt, setUpdatedAt] = useState("");
    const [finishedAt, setFinishedAt] = useState("");

    const [title, setTitle] = useState("");
    const [authors, setAuthors] = useState("");
    const [typeId, setTypeId] = useState("");
    const [formatId, setFormatId] = useState("");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const [tasks, setTasks] = useState("");

    const [selectedFile, setSelectedFile] = useState('');
    const [message, setMessage] = useState('');

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
            console.log(response.data);
            setOrderId(response.data.order.order.id);
            setNumber(response.data.order.order.number);
            setStatus(response.data.order.order.status);
            setDeadline(response.data.order.order.deadline);
            setComment(response.data.order.order.comment);
            setCreatedAt(response.data.order.order.createdAt);
            setUpdatedAt(response.data.order.order.updatedAt);
            setFinishedAt(response.data.order.order.finishedAt);
            setName(response.data.order.customer.name);
            setEmail(response.data.order.customer.email);
            setPhone(response.data.order.customer.phone);
            setTitle(response.data.order.book.title);
            setAuthors(response.data.order.book.authors);
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

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleFileUpload = async (e) => {
        e.preventDefault();
        try {
            const response = await UploadFilesService.upload(orderId, selectedFile);
            console.log(orderId);
            setMessage(response.data);
        } catch (error) {
            setMessage('File upload failed!');
        }
    };

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
                                                    <td><input type="datetime-local" name='deadline'
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
                                {/*Форма загрузки файлов*/}

                                <div className="container">
                                    <div className="col-md-6 mx-auto">
                                        <div className="row justify-content-center">
                                            <div className="card text-white bg-dark">
                                                <h4 className="text-white text-center mt-3">Загрузка файлов</h4>
                                                <div className="card-body">
                                                    {message && <div className="alert alert-info">{message}</div>}
                                                    <form>
                                                        <div className="form-group">
                                                            <input
                                                                type="file"
                                                                className="form-control text-white bg-dark"
                                                                onChange={handleFileChange}
                                                            />
                                                        </div>
                                                        <div className="text-center mt-3">
                                                            <InfoButton title="Загрузить" onClick={handleFileUpload}/>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/*Конец формы загрузки файлов*/}

                                {/*Задачи*/}
                                <div className='content container'>
                                    <h3 className='text-center m-3'>Задачи</h3>
                                    <LiteButton title={"Добавить задачу"} onClick={addNewTask}/>
                                    <table
                                        className='table table-dark table-striped table-bordered text-center align-middle'>
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
                                                <tr key={task.task.id}>
                                                    <td>{task.task.id}</td>
                                                    <td>{task.task.title}</td>
                                                    <td>{task.username}</td>
                                                    <td>{task.task.status}</td>
                                                    <td>{task.task.createdAt ? new Date(task.task.createdAt).toLocaleDateString('ru-RU') : '-'}</td>
                                                    <td>{task.task.updatedAt ? new Date(task.task.updatedAt).toLocaleDateString('ru-RU') : '-'}</td>
                                                    <td>{task.task.finishedAt ? new Date(task.task.finishedAt).toLocaleDateString('ru-RU') : '-'}</td>
                                                    <td className='text-center'>
                                                        <SmallInfoButton title="Изменить"
                                                                         onClick={() => updateTask(task.task.id)}/>
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