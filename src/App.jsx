import './index.css'
import CustomerListComponent from "./components/Customer/CustomerListComponent.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CustomerComponent from "./components/Customer/CustomerComponent.jsx";
import BookTypeListComponent from "./components/Book/BookType/BookTypeListComponent.jsx";
import BookTypeComponent from "./components/Book/BookType/BookTypeComponent.jsx";
import BookFormatListComponent from "./components/Book/BookFormat/BookFormatListComponent.jsx";
import BookFormatComponent from "./components/Book/BookFormat/BookFormatComponent.jsx";
import MainComponent from "./components/MainComponent.jsx";
import SignUpComponent from "./components/User/SignUpComponent.jsx";
import LoginComponent from "./components/User/LoginComponent.jsx";
import OrderListComponent from "./components/Order/OrderListComponent.jsx";
import OrderCreateComponent from "./components/Order/OrderCreateComponent.jsx";
import TaskListComponent from "./components/User/Task/TaskListComponent.jsx";
import TaskCreateComponent from "./components/User/Task/TaskCreateComponent.jsx";
import OrderViewComponent from "./components/Order/OrderViewComponent.jsx";
import OrderUpdateComponent from "./components/Order/OrderUpdateComponent.jsx";
import {TaskUpdateComponent} from "./components/User/Task/TaskUpdateComponent.jsx";
import Navbar from "./components/UI/Navbar.jsx";
import UserService from "./services/UserService.js";
import TaskViewComponent from "./components/User/Task/TaskViewComponent.jsx";

export default function App() {

    return (
        <>
            <BrowserRouter>
                <Navbar auth={UserService.isAuthenticated()}/>
                <Routes>
                    {/* http://localhost:5555 */}
                    <Route path='/' element={<MainComponent/>}></Route>

                    {/* http://localhost:5555/sign-up */}
                    <Route path='/sign-up' element={<SignUpComponent/>}></Route>

                    {/* http://localhost:5555/sign-in */}
                    <Route path='/sign-in' element={<LoginComponent/>}></Route>

                    {/* http://localhost:5555/orders */}
                    <Route path='/orders' element={<OrderListComponent/>}></Route>

                    {/* http://localhost:5555/orders/create */}
                    <Route path='/orders/create' element={<OrderCreateComponent/>}></Route>

                    {/* http://localhost:5555/orders/view/1 */}
                    <Route path='/orders/view/:id' element={<OrderViewComponent/>}></Route>

                    {/* http://localhost:5555/orders/update/1 */}
                    <Route path='/orders/update/:id' element={<OrderUpdateComponent/>}></Route>

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

                    {/* http://localhost:5555/tasks */}
                    <Route path='/tasks' element={<TaskListComponent/>}></Route>

                    {/* http://localhost:5555/tasks/update/1 */}
                    <Route path='/tasks/update/:id' element={<TaskUpdateComponent/>}></Route>

                    {/* http://localhost:5555/tasks/1 */}
                    <Route path='/tasks/:id' element={<TaskViewComponent/>}></Route>

                    {/* http://localhost:5555/tasks/order/1/new */}
                    <Route path='/tasks/order/:id/new' element={<TaskCreateComponent/>}></Route>

                    {/* http://localhost:5555/tasks/current-user */}
                    <Route path='/tasks/current-user' element={<MainComponent/>}></Route>

                </Routes>
            </BrowserRouter>
        </>
    )
}