import 'bootstrap/dist/css/bootstrap.min.css';
import {Outlet} from 'react-router-dom';

function Container() {
    return (
        <div className="board-container">
            <Outlet/>
        </div>
    )
}

export default Container;