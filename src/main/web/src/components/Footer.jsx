import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
    return (
        <footer className="footer mt-auto py-3 my-4">
            <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                <li className="nav-item">
                    <a href="#" className="nav-link px-2 text-body-secondary">Home</a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link px-2 text-body-secondary">Features</a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link px-2 text-body-secondary">Pricing</a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link px-2 text-body-secondary">FAQs</a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link px-2 text-body-secondary">About</a>
                </li>
            </ul>
            <p className="text-center text-body-secondary">&copy; 2025 Company, Inc | All Rights Reserved.</p>
        </footer>
    )
}

export default Footer;