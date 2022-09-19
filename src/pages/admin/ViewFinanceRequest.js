import React , {useState , useEffect } from 'react';
import AllMerchantsData from '../../components/adminComponents/ViewFinanceRequest'
import Sidebar from '../../components/adminComponents/Sidebar'
import { Routes, Route } from 'react-router-dom'
import { HiOutlineMenu } from 'react-icons/hi'
import { useNavigate , useLocation } from "react-router-dom";



const HomePage = () => {
    const [active, setActive] = useState(false)
    const navigate = useNavigate();
    
    document.title = 'Reno | Admin Portal'


    return (
        <div className='admin-panel-container'>
            <div className='menu-toggle-btn' onClick={() => {setActive(!active)}}>
                <HiOutlineMenu />
            </div>
            <Sidebar isActive={active} />
            <AllMerchantsData />
            {/* <Routes>
                <Route exact path='/admin/merchantsData' element={<AllMerchantsData />} />
            </Routes> */}
        </div>
    )
}

export default HomePage;
