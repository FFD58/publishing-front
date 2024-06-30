import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import CustomerService from "../../services/CustomerService.js";
import SmallInfoButton from "../UI/buttons/SmallInfoButton.jsx";
import SmallDangerButton from "../UI/buttons/SmallDangerButton.jsx";
import BigLiteButton from "../UI/buttons/BigLiteButton.jsx";
import UserService from "../../services/UserService.js";

const CustomerListComponent = () => {

    const [customers, setCustomers] = useState([]);

    const navigator = useNavigate();


    useEffect(() => {
        getAllCustomers();
    }, []);

    const getAllCustomers = () => {
        CustomerService.listCustomers().then((response) => {
            setCustomers(response.data.length === 0 ? [] : response.data)
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
            {UserService.isAdmin() && <BigLiteButton title="Новый заказчик" onClick={addNewCustomer}/>}
            <table className='table table-dark table-striped table-bordered text-center align-middle'>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>ФИО</th>
                    <th>Телефон</th>
                    <th>Email</th>
                    {UserService.isAdmin() && <th colSpan="2">Действия</th>}
                </tr>
                </thead>
                <tbody>
                {
                    customers.map(customer =>
                        <tr key={customer.id}>
                            <td>{customer.id}</td>
                            <td>{customer.name}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.email}</td>
                            {UserService.isAdmin() && <td>
                                <SmallInfoButton title="Изменить" onClick={() => updateCustomer(customer.id)}/>
                            </td>}
                            {UserService.isAdmin() && <td>
                                <SmallDangerButton title="Удалить" onClick={() => removeCustomer(customer.id)}/>
                            </td>}
                        </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    )
}
export default CustomerListComponent;