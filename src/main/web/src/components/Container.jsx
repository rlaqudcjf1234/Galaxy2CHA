import '../css/Container.css';
import {Outlet, Navigate} from 'react-router-dom';
import {tokenSelector} from "../redux/store"

export const Container = () => {
    return (
        <div className="container">
            <Outlet/>
        </div>
    )
}

export const PrivateCotainer = () => {
    const {val} = tokenSelector(state => state.accessToken);
    if(val == ""){
        return <Navigate to="/login" />
    }
    return (
        <div className="container">
            <Outlet/>
        </div>
    )
};