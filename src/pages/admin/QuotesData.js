import React , {useState} from 'react';
import AllQuotesData from '../../components/adminComponents/AllQuotes'
import Sidebar from '../../components/adminComponents/Sidebar'
import { Routes, Route } from 'react-router-dom'
import { HiOutlineMenu } from 'react-icons/hi'


const HomePage = () => {
    const [active, setActive] = useState(false)

    document.title = 'Reno | Admin Portal'

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
