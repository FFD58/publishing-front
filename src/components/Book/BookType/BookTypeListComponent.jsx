import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import BookTypeService from "../../../services/BookTypeService.js";
import SmallInfoButton from "../../UI/buttons/SmallInfoButton.jsx";
import SmallDangerButton from "../../UI/buttons/SmallDangerButton.jsx";
import BigLiteButton from "../../UI/buttons/BigLiteButton.jsx";
import UserService from "../../../services/UserService.js";

const BookTypeListComponent = () => {

    const [bookTypes, setBookTypes] = useState([]);

    const navigator = useNavigate();

    useEffect(() => {
        getAllBookTypes();
    }, []);

    const getAllBookTypes = () => {
        BookTypeService.listBookTypes().then((response) => {
            setBookTypes(response.data.length === 0 ? [] : response.data);
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
        <div className='container'>
            <div className="row">
                <div className="col-md-8 m-auto">
                    <h2 className='text-center m-3'>Типы книг</h2>
                    {UserService.isAdmin() && <BigLiteButton title="Новый тип" onClick={addNewBookType}/>}
                    <table className='table table-dark table-striped table-bordered text-center align-middle'>
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Название</th>
                            {UserService.isAdmin() && <th colSpan="2">Действия</th>}
                        </tr>
                        </thead>
                        <tbody>
                        {
                            bookTypes.map(bookType =>
                                <tr key={bookType.id}>
                                    <td>{bookType.id}</td>
                                    <td>{bookType.title}</td>
                                    {UserService.isAdmin() && <td>
                                        <SmallInfoButton title="Изменить" onClick={() => updateBookType(bookType.id)}/>
                                    </td>}
                                    {UserService.isAdmin() && <td>
                                        <SmallDangerButton title="Удалить" onClick={() => removeBookType(bookType.id)}/>
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
export default BookTypeListComponent;