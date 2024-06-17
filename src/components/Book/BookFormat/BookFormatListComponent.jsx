import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import BookFormatService from "../../../services/BookFormatService.js";

const BookFormatListComponent = () => {

    const [bookFormats, setBookFormats] = useState([]);

    const navigator = useNavigate();

    useEffect(() => {
        getAllBookFormats();
    }, []);

    const getAllBookFormats = () => {
        BookFormatService.listBookFormats().then((response) => {
            setBookFormats(response.data)
        }).catch(error => {
            console.error(error);
        })
    }

    const addNewBookFormat = () => navigator('/books/formats/create');

    const updateBookFormat = (id) =>navigator(`/books/formats/update/${id}`);

    const removeBookFormat = (id) => {
        BookFormatService.deleteBookFormat(id)
            .then(response => {
                console.log(response.data);
                getAllBookFormats();
            })
            .catch(errors => console.error(errors));
    }

    return (
        <div className='container'>
            <h2 className='text-center m-3'>Форматы книжных изданий</h2>
            <button className='btn btn-dark mb-3' onClick={addNewBookFormat}>Новый формат</button>
            <table className='table table-dark table-striped table-bordered'>
                <thead>
                <tr className='text-center'>
                    <th>Id</th>
                    <th>Название</th>
                    <th>Обозначение</th>
                    <th colSpan="2">Действия</th>
                </tr>
                </thead>
                <tbody>
                {
                    // TODO: написать проверку на пустой массив bookFormats
                    bookFormats.map(bookFormat =>
                        <tr key={bookFormat.id}>
                            <td className='text-center'>{bookFormat.id}</td>
                            <td>{bookFormat.title}</td>
                            <td>{bookFormat.designation}</td>
                            <td className='text-center'>
                                <button className='btn btn-outline-info'
                                        onClick={() => updateBookFormat(bookFormat.id)}>Изменить
                                </button>
                            </td>
                            <td className='text-center'>
                                <button className='btn btn-outline-danger'
                                        onClick={() => removeBookFormat(bookFormat.id)}>Удалить
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
export default BookFormatListComponent;