import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';
import NumberResults from './components/NumberResults';
import ItemSearchResult from './components/ItemSearchResult';
import GoogleApiWrapper from './components/ImmoValMap';


class App extends React.Component {
    state = {
        immoClicked: {},
        immoFetched: [],
        nResults: 0
    }
    /* getting immoData this from the child (Map) and updating the state
     * - 'whereFrom' can be either from a click or from moving the center of the map
     * - the state will be modified based on 'whereFrom' */
getData = (immoData, whereFrom) => {
    if (whereFrom === 'click') {
        this.setState({immoClicked: immoData}, () => {
            //once state is updated, the other child (ItemSearchResult) can display it
            console.log(this.state.immoClicked, whereFrom);
            })
        }
    if (whereFrom === 'center-moved') {
        this.setState({
            immoFetched: immoData,
            nResults: immoData.length
        }, () => {
            //once state is updated, the other child (ItemSearchResult) list can display it
            console.log(this.state.immoFetched, whereFrom);
        })
        }
    }

    render() {
        return (
            <>
                <Header />
                <section className="mx-10">
                    <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row">
                        <div className="Immo-Panel my-1 px-1 w-full sm:w-full md:w-2/3 lg:w-2/3 xl:w-2/3">
                            <GoogleApiWrapper
                                className ="Immo-Map-Wrapper"
                                callback={this.getData}
                            />
                        </div>
                        <div className="my-1 ml-3 px-1 w-full  sm:w-full md:w-1/3 lg:w-1/3 xl:w-1/3">
                            <h1 className="bg-teal-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 font-normal m-2" role="alert">Try moving the map and click on a pin to see the information attached: </h1>
                            {JSON.stringify(this.state.immoClicked) !== '{}' &&
                            <ItemSearchResult
                                immoData={this.state.immoClicked}
                            />
                            }
                        </div>
                    </div>
                </section>

                <section className="mx-10">
                    <div className="text-right pr-4">
                        <p className="leading-normal">
                            <NumberResults nResults={this.state.nResults} />
                        </p>
                    </div>
                    <div className="flex flex-wrap overflow-hidden w-full">
                        {this.state.immoFetched.map((immo, key) =>
                            (
                                <div className = "my-1 px-1 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4" >
                            <ItemSearchResult
                                key={immo.id}
                                immoData={immo}
                            />
                            </div>)
                        )
                        }
                    </div>
                </section>

                <div>

                </div>
            <Footer />
            </>
        );
    }
}

export default App;
