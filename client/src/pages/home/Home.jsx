import React, {useEffect} from 'react';
import Topbar from '../../components/topbar/Topbar';
import Feed from '../../components/center/Feed';
import Leftbar from '../../components/leftbar/Leftbar';
import Rightbar from '../../components/rightbar/Rightbar';
import './home.css'



const Home = () => {


    return (
        <>
            <Topbar />
            <div className='homeContainer'>
               <Leftbar />
               <Feed/>
               <Rightbar />
            </div>
            
        </>


    )
}

export default Home;