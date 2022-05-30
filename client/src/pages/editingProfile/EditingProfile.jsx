import React from 'react';
import Topbar from '../../components/topbar/Topbar';
import Leftbar from '../../components/leftbar/Leftbar';
import './editingProfile.css'
import Editing from '../../components/editing/Editing';



const EditingProfile = () => {

    return (
        <>
            <Topbar />
            <div className='editingContainer'>
                <Leftbar />
                <Editing />
            </div>

        </>


    )
}

export default EditingProfile;