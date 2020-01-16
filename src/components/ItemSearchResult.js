import React from 'react';

class ItemSearchResult extends React.Component{
    render () {
        return (
            <div>
                    <div className="flex-1 bg-white  shadow mt-3">
                        <div className="flex flex-wrap no-underline hover:no-underline">
                            <p className="w-full text-blue-500 text-xs md:text-sm px-6 h-14 block float-right">
                            {!this.props.immoData.type_local ? 'Info not available' : this.props.immoData.type_local == 'Local industriel. commercial ou assimilé' ?  'Local' : this.props.immoData.type_local }
                            </p>
                            <p className="w-full text-gray-600 text-xs md:text-sm px-6 h-14">
                               <span className="font-bold"> {this.props.immoData.nature_mutation}</span> |
                                {this.props.immoData.date_mutation}
                            </p>
                            <div className="w-full font-bold text-xl text-blue-500 text-center p-2">
                                {this.props.immoData.valeur_fonciere} €
                            </div>
                            <p className="text-gray-800 font-serif text-base px-6 mb-5">
                                <span className="text-xs text-gray-600 ">Real built surface:</span> <span className="text-blue-500"> {this.props.immoData.surface_relle_bati}</span> m²
                            </p>
                            <p className="text-gray-800 font-serif text-base px-6 mb-5">
                                <span className="text-xs text-gray-600">Terrain surface:</span> <span className="text-blue-500"> {this.props.immoData.surface_terrain}</span> m²
                            </p>
                        </div>
                    </div>
                    <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow-lg ">
                        <div className="flex items-center justify-between h-16">
                            <p className="text-gray-600 text-xs pl-6">
                                {this.props.immoData.lat} {this.props.immoData.lng}
                                </p>
                            <p className="text-gray-600 text-xs pl-6 pr-2">
                                {this.props.immoData.numero_voie} {this.props.immoData.type_voie} {this.props.immoData.voie} {this.props.immoData.code_postal} {this.props.immoData.commune}
                            </p>
                        </div>
                    </div>
            </div>
        )
    }
}
export default ItemSearchResult;