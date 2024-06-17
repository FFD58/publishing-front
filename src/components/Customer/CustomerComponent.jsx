import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import CustomerService from "../../services/CustomerService.js";

const CustomerComponent = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const {id} = useParams();

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phone: ''
    })

    const navigator = useNavigate();

    useEffect(() => {
        CustomerService.getCustomer(id).then(response => {
            setName(response.data.name);
            setEmail(response.data.email);
            setPhone(response.data.phone);
        }).catch(errors => console.error(errors))
    }, [id]);

    const saveOrUpdateCustomer = (e) => {
        e.preventDefault();

        if (validateForm()) {
            const customer = {name, email, phone};

            if (id) {
                CustomerService.updateCustomer(id, customer)
                    .then(response => {
                        console.log(response.data);
                        navigator('/customers');
                    })
                    .catch(errors => console.error(errors))
            } else {
                CustomerService.createCustomer(customer)
                    .then(response => {
                        console.log(response.data);
                        navigator('/customers');
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

        if (name.trim()) {
            errorsCopy.name = '';
        } else {
            errorsCopy.name = 'Необходимо ввести ФИО';
            valid = false;
        }

        if (email.trim()) {
            errorsCopy.email = '';
        } else {
            errorsCopy.email = 'Необходимо ввести адрес электронной почты';
            valid = false;
        }

        if (phone.trim()) {
            errorsCopy.phone = '';
        } else {
            errorsCopy.phone = 'Необходимо ввести номер телефона';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    const getTitle = () => id ? "Изменить" : "Создать";

    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="card text-white bg-dark mb-3">
                        <h2 className='text-center m-3'>{getTitle()} заказчика</h2>
                        <div className="card-body">
                            <form>
                                <div className="form-group mb-2">
                                    <label className='form-label'>ФИО</label>
                                    <input type="text"
                                           placeholder='Введите ФИО'
                                           name='name'
                                           value={name}
                                           className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                           onChange={(e) => setName(e.target.value)}
                                    />
                                    {errors.name && <div className='invalid-feedback'>{errors.name}</div>}
                                </div>
                                <div className="form-group mb-2">
                                    <label className='form-label'>Email</label>
                                    <input type="email"
                                           placeholder='Введите email'
                                           name='email'
                                           value={email}
                                           className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                           onChange={(e) => setEmail(e.target.value)}
                                    />
                                    {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                                </div>
                                <div className="form-group mb-2">
                                    <label className='form-label'>Телефон</label>
                                    <input type="text"
                                           placeholder='Введите номер телефона'
                                           name='phone'
                                           value={phone}
                                           className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                           onChange={(e) => setPhone(e.target.value)}
                                    />
                                    {errors.phone && <div className='invalid-feedback'>{errors.phone}</div>}
                                </div>
                                <button className='btn btn-outline-light' onClick={saveOrUpdateCustomer}>
                                    {getTitle()}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerComponent;