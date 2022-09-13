import React , {useState , useEffect} from 'react';
import AllFinancialRequestsData from '../../components/adminComponents/AllFinanceRequests'
import Sidebar from '../../components/adminComponents/Sidebar'
import { Routes, Route } from 'react-router-dom'
import { HiOutlineMenu } from 'react-icons/hi'
import { useNavigate } from "react-router-dom";



const HomePage = () => {
    const [active, setActive] = useState(false)

    document.title = 'Reno | Admin Portal'
    const navigate = useNavigate();

    return (
        <div className='admin-panel-container'>
            <div className='menu-toggle-btn' onClick={() => {setActive(!active)}}>
                <HiOutlineMenu />
            </div>
            <Sidebar isActive={active} />
            <AllFinancialRequestsData />
            {/* <Routes>
                <Route exact path='/admin/merchantsData' element={<AllFinancialRequestsData />} />
            </Routes> */}
        </div>
    )
}

export default HomePage;
