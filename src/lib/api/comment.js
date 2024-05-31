import client from './client';

export const writeComment = ({ id, content }) =>
  client.post(`/api/posts/${id}`, {content});

export const readComment = id => 
    client.get(`/api/posts/${id}/commnets`);
  
export const updateComment = ({postId, commentId, content}) => 
  client.put(`/api/posts/${postId}/comments/${commentId}`, {
    content,
});
  
export const removeComment = ({postId, commentId}) => 
    client.delete(`/api/posts/${postId}/comments/${commentId}`);