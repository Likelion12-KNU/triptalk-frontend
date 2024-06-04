import client from './client';

export const writePost = ({ title, content }) =>
  client.post('/api/posts', { title, content });
  
export const readPost = id => client.get(`/api/posts/${id}`);
  
export const listPosts = ({id, title, content, nickname}) => {
  return client.get(`/api/posts`, {
    params: {id, title, content, nickname},
  });
};
  
export const updatePost = ({id, title, content}) => 
  client.put(`/api/posts/${id}`, {
    title,
    content,
});
  
export const removePost = id => client.delete(`/api/posts/${id}`);