import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import OrderService from "../../services/OrderService.js";

const OrderListComponent = () => {

    const [orders, setOrders] = useState([]);

    const navigator = useNavigate();

    useEffect(() => {
        getAllOrders();
    }, []);

    const getAllOrders = () => {
        OrderService.listOrders().then((response) => {
            setOrders(response.data);
            console.log(response.data);
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

    return (
        <div className='container'>
            <h2 className='text-center m-3'>Заказы</h2>
            <button className='btn btn-dark mb-3' onClick={addNewOrder}>Новый заказ</button>
            <table className='table table-dark table-striped table-bordered'>
                <thead>
                <tr className='text-center'>
                    <th>Id</th>
                    <th>№</th>
                    <th>Название</th>
                    <th>Авторы</th>
                    <th>Формат</th>
                    <th>Тип</th>
                    <th colSpan="2">Действия</th>
                </tr>
                </thead>
                <tbody>
                {
                    // TODO: написать проверку на пустой массив orders
                    orders.map(order =>
                        <tr key={order.id}>
                            <td className='text-center'>{order.id}</td>
                            <td>{order.number}</td>
                            <td>{order.book.title}</td>
                            <td>{order.book.authors}</td>
                            <td>{order.book.format}</td>
                            <td>{order.book.type}</td>
                            <td className='text-center'>
                                <button className='btn btn-outline-info'
                                        onClick={() => updateOrder(order.id)}>Изменить
                                </button>
                            </td>
                            <td className='text-center'>
                                <button className='btn btn-outline-danger'
                                        onClick={() => removeOrder(order.id)}>Удалить
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
export default OrderListComponent;