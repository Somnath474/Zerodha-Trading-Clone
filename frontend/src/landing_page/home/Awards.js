import React from 'react'

function Awards() {
    return ( 
        <div className='container'>
            <div className='row'>
                <div className='col-6 p-5'>
                    <img src='media/largestBroker.svg' />
                </div>
                <div className='col-6 p-5 mt-3'>
                    <h1>Largest stock broker in India</h1>
                    <p className='mb-5'>2+ million Zerodha clients contribute to over 15% of all retail trade volumes in India daily by traidng and investing in:</p>
                    <div className='row'>
                        <div className='col-6 ' >
                            <ul>
                        <li>Futures and Options</li>
                        <li>Stocks & IPOs</li>
                        <li>Commodity derivatives</li>
                        </ul>
                        </div>
                        <div className='col-6 '>
                            <ul>
                                 <li>Direct mutual funds</li>
                        <li>Currency derivatives</li>
                        <li>Bonds and Govern</li>
                    </ul>
                        </div>
                        <img src='media\pressLogos.png ' style={{width:"90%"}}/>
                    </div>
                    
                       
                </div>
            </div>
        </div>
     );
}

export default Awards;