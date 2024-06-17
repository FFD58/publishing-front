import './App.css'
import HeaderComponent from "./components/UI/HeaderComponent.jsx";
import CustomerListComponent from "./components/Customer/CustomerListComponent.jsx";
import FooterComponent from "./components/UI/FooterComponent.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CustomerComponent from "./components/Customer/CustomerComponent.jsx";
import BookTypeListComponent from "./components/Book/BookType/BookTypeListComponent.jsx";
import BookTypeComponent from "./components/Book/BookType/BookTypeComponent.jsx";
import BookFormatListComponent from "./components/Book/BookFormat/BookFormatListComponent.jsx";
import BookFormatComponent from "./components/Book/BookFormat/BookFormatComponent.jsx";
import MainComponent from "./components/UI/MainComponent.jsx";
import SignUpComponent from "./components/User/SignUpComponent.jsx";
import SignInComponent from "./components/User/SignInComponent.jsx";
import OrderListComponent from "./components/Order/OrderListComponent.jsx";
import OrderComponent from "./components/Order/OrderComponent.jsx";

export default function App() {

    return (
        <>
            <BrowserRouter>
                <HeaderComponent/>
                <Routes>
                    {/* http://localhost:5555 */}
                    <Route path='/' element={<MainComponent/>}></Route>

                    {/* http://localhost:5555/sign-up */}
                    <Route path='/sign-up' element={<SignUpComponent/>}></Route>

                    {/* http://localhost:5555/sign-in */}
                    <Route path='/sign-in' element={<SignInComponent/>}></Route>

                    {/* http://localhost:5555/orders */}
                    <Route path='/orders' element={<OrderListComponent/>}></Route>

                    {/* http://localhost:5555/orders/create */}
                    <Route path='/orders/create' element={<OrderComponent/>}></Route>

                    {/* http://localhost:5555/customers */}
                    <Route path='/customers' element={<CustomerListComponent/>}></Route>

                    {/* http://localhost:5555/customers/create */}
                    <Route path='/customers/create' element={<CustomerComponent/>}></Route>

                    {/* http://localhost:5555/customers/update/1 */}
                    <Route path='/customers/update/:id' element={<CustomerComponent/>}></Route>

                    {/* http://localhost:5555/books/types */}
                    <Route path='/books/types' element={<BookTypeListComponent/>}></Route>

                    {/* http://localhost:5555/books/types/create */}
                    <Route path='/books/types/create' element={<BookTypeComponent/>}></Route>

                    {/* http://localhost:5555/books/types/update/1 */}
                    <Route path='/books/types/update/:id' element={<BookTypeComponent/>}></Route>

                    {/* http://localhost:5555/books/formats */}
                    <Route path='/books/formats' element={<BookFormatListComponent/>}></Route>

                    {/* http://localhost:5555/books/formats/create */}
                    <Route path='/books/formats/create' element={<BookFormatComponent/>}></Route>

                    {/* http://localhost:5555/books/formats/update/1 */}
                    <Route path='/books/formats/update/:id' element={<BookFormatComponent/>}></Route>
                </Routes>
                <FooterComponent/>
            </BrowserRouter>
        </>
    )
}