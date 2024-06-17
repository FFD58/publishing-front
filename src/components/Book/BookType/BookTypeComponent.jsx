import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import BookTypeService from "../../../services/BookTypeService.js";

const BookTypeComponent = () => {

    const [title, setTitle] = useState("");

    const {id} = useParams();

    const [errors, setErrors] = useState({
        title: '',
    })

    const navigator = useNavigate();

    useEffect(() => {
        BookTypeService.getBookType(id).then(response => {
            setTitle(response.data.title);
        }).catch(errors => console.error(errors))
    }, [id]);

    const saveOrUpdateBookType = (e) => {
        e.preventDefault();

        if (validateForm()) {
            const bookType = {title};

            if (id) {
                BookTypeService.updateBookType(id, bookType)
                    .then(response => {
                        console.log(response.data);
                        navigator('/books/types');
                    })
                    .catch(errors => console.error(errors))
            } else {
                BookTypeService.createBookType(bookType)
                    .then(response => {
                        console.log(response.data);
                        navigator('/books/types');
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
        setErrors(errorsCopy);
        return valid;
    }

    const getTitle = () => id ? "Изменить" : "Создать";

    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="card text-white bg-dark mb-3">
                        <h2 className='text-center m-3'>{getTitle()} book type</h2>
                        <div className="card-body">
                            <form>
                                <div className="form-group mb-2">
                                    <label className='form-label'>Title</label>
                                    <input type="text"
                                           placeholder='Введите название'
                                           name='title'
                                           value={title}
                                           className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                           onChange={(e) => setTitle(e.target.value)}
                                    />
                                    {errors.title && <div className='invalid-feedback'>{errors.title}</div>}
                                </div>
                                <button className='btn btn-outline-light' onClick={saveOrUpdateBookType}>
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

export default BookTypeComponent;