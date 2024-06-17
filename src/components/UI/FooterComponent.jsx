import logo from '../../assets/img/egar.jpg';
const FooterComponent = () => {
    return (
        <footer className='footer'>
            <div className='container d-flex justify-content-between'>
                <p className='p-2'>© Developed by Fafurin F.D. All rights reserved, 2024</p>
                <p className='footer-span'>
                    <span className='p-2'>Special for</span>
                    <img className='w-50 p-1' src={logo} alt="EGAR Technology"/>
                </p>
            </div>
        </footer>
    )
};

export default FooterComponent;