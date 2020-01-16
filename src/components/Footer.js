import React from 'react';
import logo from "../assets/images/icon.png";

class Footer extends React.Component {
    render(){
        return (
            <footer className="font-sans bg-black text-white py-8 px-4">
                <div className="mx-auto max-w-xl overflow-hidden flex justify-between items-center">
                    <div>
                        <img src={logo} className="h-20" alt="logo"/> <span
                        className="inline-block text-2xl">IMMOVAL</span>
                    </div>
                    <p className="inline-block py-2 px-3 text-gray-700 text-xl"> a
                        <span className="font-bold"> <a className="Immo-Color"
                                                        href="https://reactjs.org/">React</a></span> app using
                        <span className="font-bold"> <a className="Immo-Color"
                                                        href="https://developers.google.com/maps/documentation">Google Maps API</a></span> and
                        <span className="font-bold"><a className="Immo-Color"
                                                       href="https://www.data.gouv.fr/en/reuses/micro-api-dvf-demande-de-valeurs-foncieres/"> micro-API DVF </a></span>
                    </p>
                </div>
            </footer>
        )
    }

}

export default Footer;