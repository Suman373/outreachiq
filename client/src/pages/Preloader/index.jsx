import logo from '/logo.png';

const Preloader = () => {
    return (
        <div style={{height:"100vh", width:'100vw', display:'grid', placeContent:'center'}}>
            <img className='h-[50px] w-auto' src={logo} alt='logo' />
        </div>
    )
}

export default Preloader;