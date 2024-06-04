import client from './client';

export const writeComment = ({ postId, content }) =>
  client.post(`/api/posts/${postId}/comments`, {content});

export const readComment = postId => 
    client.get(`/api/posts/${postId}/commnets`);
  
export const updateComment = ({postId, commentId, content}) => 
  client.put(`/api/posts/${postId}/comments/${commentId}`, {
    content,
});
  
export const removeComment = ({postId, commentId}) => 
    client.delete(`/api/posts/${postId}/comments/${commentId}`);