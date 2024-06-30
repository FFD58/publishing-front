import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import BookFormatService from "../../../services/BookFormatService.js";
import Button from "../../UI/buttons/SmallLiteButton.jsx";
import Input from "../../UI/Input.jsx";

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
                <div className="col-md-4 mx-auto">
                    <div className="card text-white bg-dark mt-5">
                        <h2 className='text-center m-3'>{getTitle()} формат книжного издания</h2>
                        <div className="card-body text-center">
                            <form>
                                <div className="form-group mb-2">
                                    <label className='form-label'>Название</label>
                                    <Input
                                        type="text"
                                        value={title}
                                        placeholder="Введите название"
                                        onChange={(e) => setTitle(e.target.value)}
                                        style={errors.title ? 'is-invalid' : ''}

                                    />
                                    {errors.title && <div className='invalid-feedback'>{errors.title}</div>}
                                </div>
                                <div className="form-group mb-2">
                                <label className='form-label'>Обозначение</label>
                                    <Input
                                        type="text"
                                        value={designation}
                                        placeholder="Введите обозначние"
                                        onChange={(e) => setDesignation(e.target.value)}
                                        style={errors.designation ? 'is-invalid' : ''}

                                    />
                                    {errors.designation && <div className='invalid-feedback'>{errors.designation}</div>}
                                </div>
                                <Button onClick={saveOrUpdateBookFormat} title={getTitle()}/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookFormatComponent;