import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import OrderService from "../../services/OrderService.js";
import BookTypeService from "../../services/BookTypeService.js";
import BookFormatService from "../../services/BookFormatService.js";
import SmallLiteButton from "../UI/buttons/SmallLiteButton.jsx";
import InfoButton from "../UI/buttons/InfoButton.jsx";
import BigInfoButton from "../UI/buttons/BigInfoButton.jsx";

const OrderCreateComponent = () => {

    const [bookTypes, setBookTypes] = useState([]);
    const [bookFormats, setBookFormats] = useState([]);

    const [number, setNumber] = useState("");
    const [deadline, setDeadline] = useState("");
    const [comment, setComment] = useState("");

    const [title, setTitle] = useState("");
    const [authors, setAuthors] = useState("");
    const [files, setFiles] = useState("");
    const [typeId, setTypeId] = useState("");
    const [formatId, setFormatId] = useState("");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const {id} = useParams();


    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phone: ''
    })

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

    useEffect(() => {
        getAllBookTypes();
        getAllBookFormats();
    }, []);

    const saveOrder = (e) => {
        e.preventDefault();

        if (validateForm()) {
            const order = {
                number, comment, deadline,
                book: {
                    title, authors, typeId, formatId
                },
                customer: {
                    name, email, phone
                }
            };
            console.error(order);
            OrderService.createOrder(order)
                .then(result => {
                    console.log(result);
                    navigator('/orders');
                })
                .catch(errors => console.error(errors));
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

        if (authors.trim()) {
            errorsCopy.authors = '';
        } else {
            errorsCopy.authors = 'Необходимо ввести ФИО автора/ов';
            valid = false;
        }

        if (name.trim()) {
            errorsCopy.name = '';
        } else {
            errorsCopy.name = 'Необходимо ввести ФИО';
            valid = false;
        }

        if (email.trim()) {
            errorsCopy.email = '';
        } else {
            errorsCopy.email = 'Необходимо ввести адрес электронной почты';
            valid = false;
        }

        if (phone.trim()) {
            errorsCopy.phone = '';
        } else {
            errorsCopy.phone = 'Необходимо ввести номер телефона';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
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
                <div className="col-md-10 mx-auto">
                    <div className="card text-white bg-dark mt-5 p-1">
                        <h2 className='text-center m-3'>Новый заказ</h2>
                        <div className="card-body">
                            <form>
                                <div className='d-flex justify-content-between col-md-12 mx-auto'>
                                    <div className="col-md-5">
                                        <h4 className='text-center m-3'>Данные издания</h4>

                                        <div className="form-group mb-2">
                                            <label className='form-label'>Название</label>
                                            <input type="text"
                                                   placeholder='Введите название'
                                                   name='title'
                                                   value={title}
                                                   className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                                   onChange={(e) => setTitle(e.target.value)}
                                            />
                                            {errors.title && <div className='invalid-feedback'>{errors.title}</div>}
                                        </div>

                                        <div className="form-group mb-2">
                                            <label className='form-label'>Авторы</label>
                                            <input type="text"
                                                   placeholder='ФИО автора/ов через запятую'
                                                   name='authors'
                                                   value={authors}
                                                   className={`form-control ${errors.authors ? 'is-invalid' : ''}`}
                                                   onChange={(e) => setAuthors(e.target.value)}
                                            />
                                            {errors.authors &&
                                                <div className='invalid-feedback'>{errors.authors}</div>}
                                        </div>

                                        <div className="form-group mb-2">
                                            <label className='form-label'>Тип книги</label>
                                            <select className="form-select" aria-label="Выберете тип книги"
                                                    onChange={(e) => setTypeId(e.target.value)}>
                                                {bookTypes.map(bookType => (
                                                    <option value={bookType.id}>{bookType.title}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="form-group mb-2">
                                            <label className='form-label'>Формат книги</label>
                                            <select className="form-select" aria-label="Выберете формат книги"
                                                    onChange={(e) => setFormatId(e.target.value)}>
                                                {bookFormats.map(bookFormat => (
                                                    <option value={bookFormat.id}>{bookFormat.title}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="form-group mb-2">
                                            <label className='form-label'>Файлы</label>
                                            <input type="file" accept="multipart/form-data" multiple
                                                   className='form-control'
                                                   onChange={handleFiles}
                                            />
                                        </div>

                                    </div>
                                    <div className="col-md-5">
                                        <h4 className='text-center m-3'>Данные заказчика</h4>
                                        <div className="form-group mb-2">
                                            <label className='form-label'>ФИО</label>
                                            <input type="text"
                                                   placeholder='Введите ФИО'
                                                   name='name'
                                                   value={name}
                                                   className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                                   onChange={(e) => setName(e.target.value)}
                                            />
                                            {errors.name && <div className='invalid-feedback'>{errors.name}</div>}
                                        </div>
                                        <div className="form-group mb-2">
                                            <label className='form-label'>Email</label>
                                            <input type="email"
                                                   placeholder='Введите email'
                                                   name='email'
                                                   value={email}
                                                   className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                                   onChange={(e) => setEmail(e.target.value)}
                                            />
                                            {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                                        </div>
                                        <div className="form-group mb-2">
                                            <label className='form-label'>Телефон</label>
                                            <input type="text"
                                                   placeholder='Введите номер телефона'
                                                   name='phone'
                                                   value={phone}
                                                   className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                                   onChange={(e) => setPhone(e.target.value)}
                                            />
                                            {errors.phone && <div className='invalid-feedback'>{errors.phone}</div>}
                                        </div>
                                    </div>
                                </div>
                                <h4 className='text-center m-3'>Данные заказа</h4>
                                <div className='d-flex justify-content-between col-md-12 mx-auto'>
                                    <div className="col-md-5">
                                        <div className="form-group mb-2">
                                            <label className='form-label'>Номер</label>
                                            <input type="number"
                                                   placeholder='Номер заказа'
                                                   name='number'
                                                   value={number}
                                                   className='form-control'
                                                   onChange={(e) => setNumber(e.target.value)}
                                            />
                                        </div>

                                        <div className="form-group mb-2">
                                            <label className='form-label'>Сроки</label>
                                            <input type="text"
                                                   placeholder='Сроки заказа'
                                                   name='deadline'
                                                   value={deadline}
                                                   className='form-control'
                                                   onChange={(e) => setDeadline(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group mb-2">
                                    <textarea name='comment'
                                              className='p-3 w-100 rounded'
                                              value={comment}
                                              placeholder='Комментарии к заказу'
                                              rows="5"
                                              onChange={(e) => setComment(e.target.value)}/>
                                        </div>
                                    </div>


                                </div>
                                <div className='text-center'>
                                    <BigInfoButton title="Создать" onClick={saveOrder}/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderCreateComponent;