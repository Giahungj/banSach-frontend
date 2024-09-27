import React from 'react';
import Item from './Item';


function Menu(props) {


    const list = [
        { link: "/login", content: "Login" },
        { link: "/car", content: "Car" },
        { link: "/hello", content: "Hello" },
        { link: "/add", content: "Add" },

    ];

    const renderItem = list.map((ls) => <Item link={ls.link} content={ls.content} />)
    return (
        <>


            

            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
        
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 fw-bold">
                            {renderItem}
                        </ul>
                        <form className="d-flex" style={{ width: '500px', marginRight: '200px' }} >
                            <input
                                type="text"
                                className="form-control me-2"
                                id="masv"
                                placeholder="Search"
                                required
                            />
                            <input className="btn btn-primary" type="submit" value="Search" />
                        </form>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 fw-bold">
                            
                           Hello: {props.information}
                        </ul>

                    </div>
                </div>
            </nav>




        </>


    )
}



export default Menu