import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import BookFormatService from "../../../services/BookFormatService.js";

const BookFormatComponent = () => {

    const [title, setTitle] = useState("");
    const [designation, setDesignation] = useState("");

    const {id} = useParams();

    const [errors, setErrors] = useState({
        title: '',
        designation: '',
    })

    const navigator = useNavigate();

    useEffect(() => {
        BookFormatService.getBookFormat(id).then(response => {
            setTitle(response.data.title);
            setDesignation(response.data.designation);
        }).catch(errors => console.error(errors))
    }, [id]);

    const saveOrUpdateBookFormat = (e) => {
        e.preventDefault();

        if (validateForm()) {
            const bookFormat = {title, designation};

            if (id) {
                BookFormatService.updateBookFormat(id, bookFormat)
                    .then(response => {
                        console.log(response.data);
                        navigator('/books/formats');
                    })
                    .catch(errors => console.error(errors))
            } else {
                BookFormatService.createBookFormat(bookFormat)
                    .then(response => {
                        console.log(response.data);
                        navigator('/books/formats');
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
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
        if (title.trim()) {
            errorsCopy.designation = '';
        } else {
            errorsCopy.designation = 'Необходимо ввести обозначение';
            valid = false;
        }
        setErrors(errorsCopy);
        return valid;
    }

    const getTitle = () => id ? "Изменить" : "Создать";

    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="card text-white bg-dark mb-3">
                        <h2 className='text-center m-3'>{getTitle()} формат книжного издания</h2>
                        <div className="card-body">
                            <form>
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
                                    <label className='form-label'>Обозначение</label>
                                    <input type="text"
                                           placeholder='Введите обозначние'
                                           name='designation'
                                           value={designation}
                                           className={`form-control ${errors.designation ? 'is-invalid' : ''}`}
                                           onChange={(e) => setDesignation(e.target.value)}
                                    />
                                    {errors.designation && <div className='invalid-feedback'>{errors.designation}</div>}
                                </div>
                                <button className='btn btn-outline-light' onClick={saveOrUpdateBookFormat}>
                                    {getTitle()}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookFormatComponent;