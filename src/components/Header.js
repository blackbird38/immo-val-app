import React from 'react';
import logo from "../assets/images/icon.png";

class Header extends React.Component {
    render(){
        return (
            <nav className="mx-10 font-sans bg-white text-center flex justify-between my-4 mx-2 container overflow-hidden">
                <div><a href="http://localhost:3000" className="block text-left">
                    <img src={logo} className="h-10 sm:h-10 inline-block"
                         alt="logo"/> <span className="inline-block text-2xl">IMMOVAL</span>
                </a></div>
                <ul className="text-sm text-gray-700 list-none p-0 flex items-center">
                    <li><a href="http://localhost:3000"
                           className="inline-block py-2 px-3 text-gray-900 hover:text-gray-700 no-underline"> </a>
                    </li>
                    <li><a href="http://localhost:3000"
                           className="inline-block py-2 px-3 text-gray-900 hover:text-gray-700 no-underline"> </a>
                    </li>

                </ul>
            </nav>
        )
    }

}

export default Header;