import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import BookFormatService from "../../../services/BookFormatService.js";
import SmallDangerButton from "../../UI/buttons/SmallDangerButton.jsx";
import SmallInfoButton from "../../UI/buttons/SmallInfoButton.jsx";
import BigLiteButton from "../../UI/buttons/BigLiteButton.jsx";
import UserService from "../../../services/UserService.js";

const BookFormatListComponent = () => {

    const [bookFormats, setBookFormats] = useState([]);

    const navigator = useNavigate();

    useEffect(() => {
        getAllBookFormats();
    }, []);

    const getAllBookFormats = () => {
        BookFormatService.listBookFormats().then((response) => {
            setBookFormats(response.data.length === 0 ? [] : response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    const addNewBookFormat = () => navigator('/books/formats/create');

    const updateBookFormat = (id) => navigator(`/books/formats/update/${id}`);

    const removeBookFormat = (id) => {
        if (confirm("Вы уверены?")) {
            BookFormatService.deleteBookFormat(id)
                .then(response => {
                    console.log(response.data);
                    getAllBookFormats();
                })
                .catch(errors => console.error(errors));
        }
    }

    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-8 m-auto">
                    <h2 className='text-center m-3'>Форматы книжных изданий</h2>
                    {UserService.isAdmin() && <BigLiteButton title="Новый формат" onClick={addNewBookFormat}/>}
                    <table className='table table-dark table-striped table-bordered text-center align-middle'>
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Название</th>
                            <th>Обозначение</th>
                            {UserService.isAdmin() && <th colSpan="2">Действия</th>}
                        </tr>
                        </thead>
                        <tbody>
                        {
                            bookFormats.map(bookFormat =>
                                <tr key={bookFormat.id}>
                                    <td>{bookFormat.id}</td>
                                    <td>{bookFormat.title}</td>
                                    <td>{bookFormat.designation}</td>
                                    {UserService.isAdmin() && <td className='text-center'>
                                        <SmallInfoButton title="Изменить"
                                                         onClick={() => updateBookFormat(bookFormat.id)}/>
                                    </td>}
                                    {UserService.isAdmin() && <td className='text-center'>
                                        <SmallDangerButton title="Удалить"
                                                           onClick={() => removeBookFormat(bookFormat.id)}/>
                                    </td>}
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default BookFormatListComponent;