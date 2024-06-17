import logo from '../../assets/img/logo.png';
const Navbar = () => {
    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarScroll">
                    <div className='container'>
                        <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll d-flex align-items-center">
                            <li className="nav-item text-white">
                                <a className="nav-link active" href="/public">
                                    <img className='w-75' src={logo} alt="Издательство"/>
                                </a>
                            </li>
                            <li className="nav-item text-white">
                                <a className="nav-link active" href="/orders">Заказы</a>
                            </li>
                            <li className="nav-item text-white">
                                <a className="nav-link active" href="/books/types">Типы книг</a>
                            </li>
                            <li className="nav-item text-white">
                                <a className="nav-link active" href="/books/formats">Форматы книг</a>
                            </li>
                            <li className="nav-item text-white">
                                <a className="nav-link active" href="/customers">Заказчики</a>
                            </li>
                            <li className="nav-item text-white">
                                <a className="nav-link active" href="/sign-in">Войти</a>
                            </li>
                            <li className="nav-item text-white">
                                <a className="nav-link active" href="/sign-up">Зарегистрироваться</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;