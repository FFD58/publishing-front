import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import CustomerService from "../../services/CustomerService.js";
import SmallLiteButton from "../UI/buttons/SmallLiteButton.jsx";
import Input from "../UI/Input.jsx";

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

    const getTitle = () => id ? "Изменить данные" : "Создать";

    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-5 mx-auto mt-5">
                    <div className="card text-white bg-dark mb-3">
                        <h2 className='text-center m-3'>{getTitle()} заказчика</h2>
                        <div className="card-body text-center">
                            <form>
                                <div className="form-group mb-2">
                                    <label className='form-label'>ФИО</label>
                                    <Input
                                        type="text"
                                        value={name}
                                        placeholder="Введите ФИО"
                                        onChange={(e) => setName(e.target.value)}
                                        style={errors.name ? 'is-invalid' : ''}

                                    />
                                    {errors.name && <div className='invalid-feedback'>{errors.name}</div>}
                                </div>
                                <div className="form-group mb-2">
                                    <label className='form-label'>Email</label>
                                    <Input
                                        type="email"
                                        value={email}
                                        placeholder="Введите email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        style={errors.email ? 'is-invalid' : ''}

                                    />
                                    {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                                </div>
                                <div className="form-group mb-2">
                                    <label className='form-label'>Телефон</label>
                                    <Input
                                        type="text"
                                        value={phone}
                                        placeholder="Введите номер телефона"
                                        onChange={(e) => setPhone(e.target.value)}
                                        style={errors.phone ? 'is-invalid' : ''}

                                    />
                                    {errors.phone && <div className='invalid-feedback'>{errors.phone}</div>}
                                </div>
                                <SmallLiteButton onClick={saveOrUpdateCustomer} title={getTitle()}/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerComponent;