import React, {Component} from 'react';
import logo from './logo.jpg';

class PageHeader extends Component {
    
    render(){
        return(
            <div className="pageHeader">
            <img src={logo} alt="logo" />
            <h1>Nord Software</h1>
            </div>
        );  
    }
}

export default PageHeader;