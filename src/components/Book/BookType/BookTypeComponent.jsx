import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import BookTypeService from "../../../services/BookTypeService.js";
import Button from "../../UI/buttons/SmallLiteButton.jsx";
import Input from "../../UI/Input.jsx";

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
                <div className="col-md-5 mx-auto">
                    <div className="card text-white bg-dark mt-5">
                        <h2 className='text-center m-3'>{getTitle()} тип книги</h2>
                        <div className="card-body text-center">
                            <form>
                                <div className="form-group mb-2">
                                    <label className='form-label'>Title</label>
                                    <Input
                                        type="text"
                                        value={title}
                                        placeholder="Введите название"
                                        onChange={(e) => setTitle(e.target.value)}
                                        style={errors.title ? 'is-invalid' : ''}

                                    />
                                    {errors.title && <div className='invalid-feedback'>{errors.title}</div>}
                                </div>
                                <Button onClick={saveOrUpdateBookType} title={getTitle()}/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookTypeComponent;