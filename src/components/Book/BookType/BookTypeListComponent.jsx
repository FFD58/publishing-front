import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import BookTypeService from "../../../services/BookTypeService.js";

const BookTypeListComponent = () => {

    const [bookTypes, setBookTypes] = useState([]);

    const navigator = useNavigate();

    useEffect(() => {
        getAllBookTypes();
    }, []);

    const getAllBookTypes = () => {
        BookTypeService.listBookTypes().then((response) => {
            setBookTypes(response.data)
        }).catch(error => {
            console.error(error);
        })
    }

    const addNewBookType = () => navigator('/books/types/create');

    const updateBookType = (id) => navigator(`/books/types/update/${id}`);

    const removeBookType = (id) => {
        BookTypeService.deleteBookType(id)
            .then(response => {
                console.log(response.data.token);
                getAllBookTypes();
            })
            .catch(errors => console.error(errors));
    }

    return (
        <div className='content container'>
            <h2 className='text-center m-3'>Book Types</h2>
            <button className='btn btn-dark mb-3' onClick={addNewBookType}>Новый тип</button>
            <table className='table table-dark table-striped table-bordered'>
                <thead>
                <tr className='text-center'>
                    <th>Id</th>
                    <th>Название</th>
                    <th colSpan="2">Действия</th>
                </tr>
                </thead>
                <tbody>
                {
                    // TODO: написать проверку на пустой массив bookTypes
                    bookTypes.map(bookType =>
                        <tr key={bookType.id}>
                            <td className='text-center'>{bookType.id}</td>
                            <td>{bookType.title}</td>
                            <td className='text-center'>
                                <button className='btn btn-outline-info'
                                        onClick={() => updateBookType(bookType.id)}>Изменить
                                </button>
                            </td>
                            <td className='text-center'>
                                <button className='btn btn-outline-danger'
                                        onClick={() => removeBookType(bookType.id)}>Удалить
                                </button>
                            </td>
                        </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    )
}
export default BookTypeListComponent;