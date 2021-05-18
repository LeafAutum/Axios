import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    state ={
        loadedpost:null
    }
    componentDidMount(){
        console.log("response5",this.props);
        this.loaddata();
};
    componentDidUpdate(){
        this.loaddata();
    }


loaddata () {
    if(this.props.match.params.id){
        if(!this.state.loadedpost || (this.props.match.params.id !== this.state.loadedpost.id)){
           axios.get('/posts/'+ this.props.match.params.id ).then(response => 
    {
     this.setState({loadedpost:response.data});
     console.log("response",response);
    })
}
}
};

deletepostHandler= () =>{
    axios.delete('/posts/' + this.props.match.params.id).then(response => 
    {
        console.log(response);
    });
}
    render () {
        let post = <p style={{textAlign:'center'}}>Please select a Post!</p>;
        // console.log(this.props.id +"id");
        if(this.props.id ){
            post = <p style={{textAlign:'center'}}>loading post</p>;
        }

        if(this.state.loadedpost){
        post = (
            <div className="FullPost">
                <h1>{this.state.loadedpost.title}</h1>
                <p>{this.state.loadedpost.content}</p>
                <div className="Edit">
                    <button onClick ={this.deletepostHandler} className="Delete">Delete</button>
                </div>
            </div>

        );
        }
        return post;
    }
}

export default FullPost;