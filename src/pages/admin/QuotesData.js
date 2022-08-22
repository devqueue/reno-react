import React , {useState , useEffect } from 'react';
import AllQuotesData from '../../components/adminComponents/AllQuotes'
import Sidebar from '../../components/adminComponents/Sidebar'
import { Routes, Route } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { HiOutlineMenu } from 'react-icons/hi'




const HomePage = () => {
    const [active, setActive] = useState(false)
    const navigate = useNavigate();

    document.title = 'Reno | Admin Portal'

    // checking if user is signed in or not
    useEffect(() =>{
        const adminToken = JSON.parse(localStorage.getItem('reno-admin-token'))
        const isSessionFound = sessionStorage.getItem("reno-admin-token");
        if(!adminToken && !isSessionFound){
            navigate("/admin/login");
        }
    },[])

    return (
        <div className='admin-panel-container'>
            <div className='menu-toggle-btn' onClick={() => {setActive(!active)}}>
                <HiOutlineMenu />
            </div>
            <Sidebar isActive={active} />
            <AllQuotesData />
            {/* <Routes>
                <Route exact path='/admin/merchantsData' element={<AllMerchantsData />} />
            </Routes> */}
        </div>
    )
}

export default HomePage;
