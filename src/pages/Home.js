import React, { useCallback, useEffect, useState } from 'react'
import {  collection, deleteDoc, doc ,onSnapshot} from 'firebase/firestore';
import { db ,auth } from "../firebase-config";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';



function Home({isAuth}) {
    const [postLists,setPostLists] = useState([])
    const postCollectionRef = useCallback(()=> collection(db, "posts"),[]);

    const deletePost = async (id)=>{
      const postdoc = doc(db,"posts",id);
      await deleteDoc(postdoc);
      // window.location.reload();
      //working but find an alternative
   }
      
      // useEffect(() => {
      //    const getPosts = async () => {
      //       const data = await getDocs(postCollectionRef);
      //       setPostLists(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      //       //infinte read
      //    };
      //    getPosts();
      // },[]);

      useEffect(() => {
         const unsubscribe = onSnapshot(postCollectionRef(), (querySnapshot) => {
           setPostLists(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id}))); 
           console.log("hi",doc.data)
         });
              // Cleanup the subscription when the component unmounts
         return () => unsubscribe();
       }, [postCollectionRef]);
     

  return (
    <div className='homePage'>
     {postLists.map((post)=>{
        return <div key={post.id} className='post'>
           <div className='postHeader'>
           <div className='title'>
              <h1>{post.title}</h1> 
              </div>
              <div className='deletePost'>
              { isAuth  && post.author.id === auth.currentUser.uid &&
               <button onClick={()=>deletePost(post.id)}><FontAwesomeIcon icon={faTrash} className='trash-icon'/></button> 
               }
              </div>         
           </div>
           <div className='postTextContainer'>{post.postText}</div>
            <h4>@{post.author.name}</h4>
           
        </div>
     })}
    </div>
 
    )
 }

export default Home;
