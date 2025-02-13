import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../css/Container.css';
import {Outlet} from 'react-router-dom';

const Container = () => {
    return (
        <div className="container">
        <Outlet/>
        </div>
    )
}

export default Container;