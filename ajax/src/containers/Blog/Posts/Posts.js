import React, { Component }  from 'react';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import './Posts.css'; 
import { Route } from 'react-router-dom';
import FullPost from '../FullPost/FullPost';

class Posts extends Component{
    
    state={
        posts : [],
       
    }

    componentDidMount(){
        console.log('response5',this.props);
        axios.get('/posts').then(response => 
        {
            const posts= response.data.slice(0,4)
            const updatedposts = posts.map(post =>{
                return{
                ...post,
                author :"max"
            }});
  
            this.setState({posts:updatedposts})
            console.log('response4',response)
      }).catch (
          error => {
              //this.setState ({error : true});
              console.log(error);
          }
      );
     };

    postSelectedHandler= (id)=>{
        this.props.history.push({pathname : "/posts/" + id});
        // this.props.history.push("/" + id);
        console.log("idd",id)

    }
    

    render(){
        let posts = <p>SOMETHING WENT WRONG</p>
        console.log("error" + !this.state.error);
        if(!this.state.error){
         posts = this.state.posts.map(post =>{
            return (
            <Post title={post.title} 
            author={post.author}
             key={post.id}
             clicked={()=> this.postSelectedHandler(post.id)}/>)
           
        });
    }

     return (
      <div>
      <section className = "Posts">
         {posts}
      </section>
         <Route path={this.props.match.url +"/:id"}exact component = {FullPost} />
      </div>
     );
}
}

export default Posts;