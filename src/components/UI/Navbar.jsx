import logo from '../../assets/img/logo.png';
import egar from '../../assets/img/egar.jpg';
import {Link} from "react-router-dom";
import UserService from "../../services/UserService.js";

const Navbar = ({auth}) => {

    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarScroll">
                    <div className='container'>
                        <div className="row d-flex">
                            <div className="col-md-8">
                                <ul className="navbar-nav d-flex align-items-center justify-content-between">
                                    <Link className="link" to="/"><img className='w-75' src={logo} alt="Издательство"/></Link>
                                    {auth && <Link className="link" to="/orders">Заказы</Link>}
                                    {auth && <Link className="link" to="/tasks">Задачи</Link>}
                                    {auth && <Link className="link" to="/customers">Заказчики</Link>}
                                    {auth && <Link className="link" to="/books/types">Типы книг</Link>}
                                    {auth && <Link className="link" to="/books/formats">Форматы книг</Link>}
                                    {!auth &&
                                        <div>
                                            <Link className="link-auth p-2" to="/sign-in">Войти</Link>
                                            <Link className="link-auth" to="/sign-up">Зарегистрироваться</Link>
                                        </div>}
                                    {auth &&
                                        <Link className="link-auth" onClick={UserService.logout} to="/">Выйти</Link>}
                                </ul>
                            </div>
                            <div className="col-md-4 container d-flex justify-content-end align-items-center p-0 m-0">
                                <span className='nav-span'>© Developed by Fafurin F.D. in 2024 special for</span>
                                <img className='w-25' src={egar} alt="EGAR Technology"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;