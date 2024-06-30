import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import OrderService from "../../services/OrderService.js";
import SmallLiteButton from "../UI/buttons/SmallLiteButton.jsx";
import SmallInfoButton from "../UI/buttons/SmallInfoButton.jsx";
import SmallDangerButton from "../UI/buttons/SmallDangerButton.jsx";
import BigLiteButton from "../UI/buttons/BigLiteButton.jsx";
import UserService from "../../services/UserService.js";

const OrderListComponent = () => {

    const [orders, setOrders] = useState([]);

    const navigator = useNavigate();

    useEffect(() => {
        getAllOrders();
    }, []);

    const getAllOrders = () => {
        OrderService.listOrders().then((response) => {
            setOrders(response.data.length === 0 ? [] : response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    const addNewOrder = () => navigator('/orders/create');

    const updateOrder = (id) => navigator(`/orders/update/${id}`);

    const removeOrder = (id) => {
        OrderService.deleteOrder(id)
            .then(response => {
                console.log(response.data);
                getAllOrders();
            })
            .catch(errors => console.error(errors));
    }

    const viewOrder = (id) => navigator(`/orders/view/${id}`);

    return (
        <div className='container'>
            <h2 className='text-center m-3'>Заказы</h2>
            {UserService.isAdmin() && <BigLiteButton title="Новый заказ" onClick={addNewOrder}/>}
            <table className='table table-dark table-striped table-bordered text-center align-middle'>
                <thead>
                <tr className='text-center'>
                    <th>Id</th>
                    <th>№</th>
                    <th>Название</th>
                    <th>Авторы</th>
                    <th>Формат</th>
                    <th>Тип</th>
                    <th>Заказчик</th>
                    <th>Статус</th>
                    <th>Создан</th>
                    <th>Изменен</th>
                    {UserService.isUser() && <th colSpan="1">Действия</th>}
                    {UserService.isAdmin() && <th colSpan="3">Действия</th>}
                </tr>
                </thead>
                <tbody>
                {
                    orders.map(order =>
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.number}</td>
                            <td>{order.book.title}</td>
                            <td>{order.book.authors}</td>
                            <td>{order.book.format}</td>
                            <td>{order.book.type}</td>
                            <td>{order.customer.name}</td>
                            <td>{order.status}</td>
                            <td>{order.createdAt ? new Date(order.createdAt).toLocaleDateString('ru-RU') : '-'}</td>
                            <td>{order.updatedAt ? new Date(order.updatedAt).toLocaleDateString('ru-RU') : '-'}</td>
                            <td className='text-center'>
                                <SmallLiteButton title="Подробнее" onClick={() => viewOrder(order.id)}/>
                            </td>
                            {UserService.isAdmin() && <td className='text-center'>
                                <SmallInfoButton title="Изменить" onClick={() => updateOrder(order.id)}/>
                            </td>}
                            {UserService.isAdmin() && <td className='text-center'>
                                <SmallDangerButton title="Удалить" onClick={() => removeOrder(order.id)}/>
                            </td>}
                        </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    )
}
export default OrderListComponent;