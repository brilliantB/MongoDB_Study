import React from 'react';
import styled from 'styled-components';
import LoadingComponent from '../common/loading/LoadingComponent';
import PostItemComponent from '../post/PostItemComponent';


const PostListWrap = styled.div`
    padding-top: 8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`;


function PostsListComponent({postsList, onClickPost, loading}) {
    // console.log(postsList);
    return (
        <>
        {loading ? <LoadingComponent /> : <></>}
        <PostListWrap>
            {postsList.map((item,index) => (
            <PostItemComponent 
                key={index} 
                post={item} 
                onClickPost={onClickPost} 
            />
            ))}
        </PostListWrap> 
        </> 
    );
};

export default PostsListComponent;
