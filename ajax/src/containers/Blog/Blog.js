import React, { lazy,Component,Suspense } from 'react';
import axios from '../../axios';
import Post from '../../components/Post/Post';
import { Route , NavLink, Switch, Redirect} from 'react-router-dom'; 

import './Blog.css';
import Posts from './Posts/Posts';
import asynccomponent from '../../hoc/asynccomponent';
import FullPost from './FullPost/FullPost';

// import NewPost from './NewPost/NewPost';

const AsynPost = asynccomponent(()=>{
    return import('./NewPost/NewPost')
});


// const AsynPost = React.lazy(() => import('./NewPost/NewPost'));
class Blog extends Component {

   
   state ={
       auth:true,
   }
  
//    selectedpost= (id)=>{
//       this.setState({postSelected : id});
//    }

    render () {

        //console.log("post" + this.state.postSelected);
        return (
          
            <div className='Blog'>
                <header >
                    <nav>
                        <ul>
                            <li><NavLink to='/posts' exact 
                            activeClassName='my-active'
                            activeStyle= {{
                                color:'#fa923f',
                                textDecoration :'underline'
                            }}> Posts</NavLink></li>
                            <li><NavLink to ={{
                                pathname :'/new-post',
                                hash :'#submit',
                                search :'?quick-submit=true'
                                }} exact>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                
                {/* <Route path='/' exact render ={() => <h1>Home</h1>}/>  */}
               
                <Switch> 
                    {this.state.auth ?<Route path="/new-post" exact component = {AsynPost} /> :null}
                  
                    {/* <Route path ="/new-post" exact render = { () =>(
                     <Suspense fallback ={<div>Loading...</div>}>
                        <AsynPost/>
                    </Suspense>
                    )}
                    /> */}
                    <Route path="/posts" component = {Posts} />
                    <Route render ={() => <h1>Not found</h1>}/>
                 
                    {/* <Redirect from='/' to='/posts'/> */}

                   
                    
                </Switch>
               
            </div>
          
        
        );
    }
}

export default Blog;