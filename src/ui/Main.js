import React from 'react';
import { AuthContext } from "../Router";
import { render } from '@testing-library/react';
import App from '../App.js';

function Main(){
    const { dispatch : authDispatch } = React.useContext(AuthContext);

    const _onLogoutClicked = () => {
        authDispatch({
            type: "LOGOUT"
        });
    }

    return(
        <main>
            <section>
                <button className="logout" onClick={_onLogoutClicked}>Logout</button>
            </section>
            <App />
        </main>
    )
}

export default Main;