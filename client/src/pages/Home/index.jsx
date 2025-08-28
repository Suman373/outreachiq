import { Outlet } from 'react-router-dom';
import { LeftSidebar, RightSidebar } from '../../components';

const Home = () => {

    return (
        <>
            <div className="min-h-screen grid grid-cols-12">
                <div className="col-span-2 bg-neutral-800 text-white p-4">
                    <LeftSidebar/>
                </div>
                <div className="col-span-8 p-4 h-100vh">
                    <Outlet />
                </div>
                <div className="col-span-2 bg-neutral-800 p-4">
                    <RightSidebar />
                </div>
            </div>
        </>
    )
}


export default Home;