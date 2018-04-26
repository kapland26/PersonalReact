import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getUser} from './../../ducks/reducer.js'

class Home extends Component {

    componentDidMount(){
        this.props.getUser();
    }

    render(){
        // let {display_name, img, auth_id} = this.props.user;
        const user = this.props.user||{} 
        return(
            <div className="Home">
                HOME   
                <br/>
                {user.email}
                <br/>
                Welcome! 
                <br/><br/>
                Current Invites:<br/>
                Event 1<Link to={'/active-event'}><button>Go</button></Link>
                <br/><br/>
                <Link to={'/new-event'}><button>START EVENT</button></Link>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        user: state.user
    }
}

export default connect(mapStateToProps, {getUser})(Home);