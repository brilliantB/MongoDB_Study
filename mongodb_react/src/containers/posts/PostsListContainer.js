import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import PostsListComponent from '../../components/posts/PostsListComponent';

const baseURL = "http://localhost:3000";

function PostsListContainer() {
    const history = useHistory();
    const [postsList, setPostList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getData() {
            setLoading(true); //로딩 화면 띄워짐
        try{
            const response = await axios({
                method: "GET",
                url: `${baseURL}/ssac/board`,
            });
            console.log(response);
            if (response.status === 200) {
                const result = response.data.data;
                // console.log(result);
                setPostList(result);
                setLoading(false);      //로딩을 다시 한번 확인.
            }
        } catch (error){
            console.log(error);
            setLoading(false);
        }        
        }
        getData();

    }, []);

    const onClickPost = (postId) => {
        console.log(postId);
        history.push(`/post/${postId}`);
    };


    return (
        <PostsListComponent 
            loading={loading} 
            onClickPost={onClickPost} 
            postsList={postsList} 
        />
    );
}

export default PostsListContainer;
