import React, { createContext, useState, useContext } from 'react';

const PostContext = createContext();

export function PostProvider({ children }) {
    const [posts, setPosts] = useState(Array.from({ length: 1137 }, (_, index) => ({
        id: index + 1,
        title: `게시글 제목 ${index + 1}입니다.`,
        author: `작성자${index + 1}`,
        date: '2025-01-16',
        views: Math.floor(Math.random() * 100) + 1
    })));

    const addPost = (newPostData) => {
        const newPost = {
            id: posts.length + 1,
            title: newPostData.title,
            content: newPostData.content,
            author: '현재 사용자',
            date: new Date().toISOString().split('T')[0],
            views: 0
        };
        setPosts(prevPosts => [newPost, ...prevPosts]);
    };

    return (
        <PostContext.Provider value={{ posts, addPost }}>
            {children}
        </PostContext.Provider>
    );
}

export function usePost() {
    return useContext(PostContext);
}