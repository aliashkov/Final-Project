import React, {useEffect, useRef} from 'react';
import Topbar from '../../components/topbar/Topbar';
import Feed from '../../components/center/Feed';
import Leftbar from '../../components/leftbar/Leftbar';
import Rightbar from '../../components/rightbar/Rightbar';
import './home.css'



const Home = () => {

    const socket = useRef();


    return (
        <>
            <Topbar socket={socket}/>
            <div className='homeContainer'>
               <Leftbar />
               <Feed/>
               <Rightbar />
            </div>
            
        </>


    )
}

export default Home;