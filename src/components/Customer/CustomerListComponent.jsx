import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import CustomerService from "../../services/CustomerService.js";

const CustomerListComponent = () => {

    const [customers, setCustomers] = useState([]);

    const navigator = useNavigate();

    useEffect(() => {
        getAllCustomers();
    }, []);

    const getAllCustomers = () => {
        CustomerService.listCustomers().then((response) => {
            setCustomers(response.data)
        }).catch(error => {
            console.error(error);
        })
    }

    const addNewCustomer = () => navigator('/customers/create');

    const updateCustomer = (id) => navigator(`/customers/update/${id}`);

    const removeCustomer = (id) => {
        CustomerService.deleteCustomer(id)
            .then(response => {
                console.log(response.data);
                getAllCustomers();
            })
            .catch(errors => console.error(errors));
    }

    return (
        <div className='container'>
            <h2 className='text-center m-3'>Заказчики</h2>
            <button className='btn btn-dark mb-3' onClick={addNewCustomer}>Новый заказчик</button>
            <table className='table table-dark table-striped table-bordered'>
                <thead>
                <tr className='text-center'>
                    <th>Id</th>
                    <th>ФИО</th>
                    <th>Телефон</th>
                    <th>Email</th>
                    <th colSpan="2">Действия</th>
                </tr>
                </thead>
                <tbody>
                {
                    // TODO: написать проверку на пустой массив customers
                    customers.map(customer =>
                        <tr key={customer.id}>
                            <td className='text-center'>{customer.id}</td>
                            <td>{customer.name}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.email}</td>
                            <td className='text-center'>
                                <button className='btn btn-outline-info'
                                        onClick={() => updateCustomer(customer.id)}>Изменить
                                </button>
                            </td>
                            <td className='text-center'>
                                <button className='btn btn-outline-danger'
                                        onClick={() => removeCustomer(customer.id)}>Удалить
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
export default CustomerListComponent;