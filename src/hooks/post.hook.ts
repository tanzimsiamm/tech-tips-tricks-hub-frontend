// frontend/src/hooks/post.hook.ts
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import api from '../lib/api'; // Adjust path
import { IBackendResponse } from '../types/api';
import { IPostFrontend, ICreatePostPayloadFrontend, IUpdatePostPayloadFrontend, IFrontendAddCommentPayload } from '../types/posts'; // Import post types

// Service function for creating a post
const createPostService = async (postData: ICreatePostPayloadFrontend | FormData): Promise<IPostFrontend> => {
  let response;
  if (postData instanceof FormData) { // For FormData with files
    response = await api.post<IBackendResponse<IPostFrontend>>('/posts', postData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Essential for FormData
      },
    });
  } else { // For JSON data without files
    response = await api.post<IBackendResponse<IPostFrontend>>('/posts', postData);
  }

  if (!response.data.success) {
    throw new Error(response.data.message || 'Failed to create post');
  }
  return response.data.data;
};

// Service function for updating a post
const updatePostService = async ({ id, payload }: { id: string; payload: IUpdatePostPayloadFrontend }): Promise<IPostFrontend> => {
  const response = await api.put<IBackendResponse<IPostFrontend>>(`/posts/${id}`, payload);
  if (!response.data.success) {
    throw new Error(response.data.message || 'Failed to update post');
  }
  return response.data.data;
};

// Service function for deleting a post
const deletePostService = async (id: string): Promise<void> => {
  const response = await api.delete<IBackendResponse<any>>(`/posts/${id}`);
  if (!response.data.success) {
    throw new Error(response.data.message || 'Failed to delete post');
  }
};

// Service function for upvoting a post
const upvotePostService = async (id: string): Promise<IPostFrontend> => {
  const response = await api.patch<IBackendResponse<IPostFrontend>>(`/posts/${id}/upvote`);
  if (!response.data.success) {
    throw new Error(response.data.message || 'Failed to upvote post');
  }
  return response.data.data;
};

// Service function for downvoting a post
const downvotePostService = async (id: string): Promise<IPostFrontend> => {
  const response = await api.patch<IBackendResponse<IPostFrontend>>(`/posts/${id}/downvote`);
  if (!response.data.success) {
    throw new Error(response.data.message || 'Failed to downvote post');
  }
  return response.data.data;
};

// Service function for adding a comment
const addCommentService = async ({ postId, commentData }: { postId: string; commentData: IFrontendAddCommentPayload }): Promise<IPostFrontend> => {
  const response = await api.post<IBackendResponse<IPostFrontend>>(`/comments/${postId}/add`, commentData);
  if (!response.data.success) {
    throw new Error(response.data.message || 'Failed to add comment');
  }
  return response.data.data;
};

// Service function for updating a comment
const updateCommentService = async ({ postId, commentId, newText }: { postId: string; commentId: string; newText: string }): Promise<IPostFrontend> => {
  const response = await api.patch<IBackendResponse<IPostFrontend>>(`/comments/${postId}/update/${commentId}`, { text: newText });
  if (!response.data.success) {
    throw new Error(response.data.message || 'Failed to update comment');
  }
  return response.data.data;
};

// Service function for deleting a comment
const deleteCommentService = async ({ postId, commentId }: { postId: string; commentId: string }): Promise<void> => {
  const response = await api.delete<IBackendResponse<any>>(`/comments/${postId}/delete/${commentId}`);
  if (!response.data.success) {
    throw new Error(response.data.message || 'Failed to delete comment');
  }
};


export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation<IPostFrontend, Error, ICreatePostPayloadFrontend | FormData>({ // Adjust generic types
    mutationKey: ['createPost'],
    mutationFn: createPostService,
    onSuccess: (data) => {
      toast.success('Post created successfully!');
      queryClient.invalidateQueries({ queryKey: ['posts'] }); // Invalidate list of posts
      queryClient.setQueryData(['post', data._id], data); // Optionally update single post cache
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to create post.');
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation<IPostFrontend, Error, { id: string; payload: IUpdatePostPayloadFrontend }>({
    mutationKey: ['updatePost'],
    mutationFn: updatePostService,
    onSuccess: (data) => {
      toast.success('Post updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.setQueryData(['post', data._id], data);
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to update post.');
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationKey: ['deletePost'],
    mutationFn: deletePostService,
    onSuccess: () => {
      toast.success('Post deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to delete post.');
    },
  });
};

export const useUpvotePost = () => {
  const queryClient = useQueryClient();
  return useMutation<IPostFrontend, Error, string>({
    mutationKey: ['upvotePost'],
    mutationFn: upvotePostService,
    onSuccess: (data) => {
      // Optimistically update the cache
      queryClient.setQueryData(['post', data._id], data);
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to upvote post.');
    },
  });
};

export const useDownvotePost = () => {
  const queryClient = useQueryClient();
  return useMutation<IPostFrontend, Error, string>({
    mutationKey: ['downvotePost'],
    mutationFn: downvotePostService,
    onSuccess: (data) => {
      queryClient.setQueryData(['post', data._id], data);
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to downvote post.');
    },
  });
};

export const useAddComment = () => {
  const queryClient = useQueryClient();
  return useMutation<IPostFrontend, Error, { postId: string; commentData: IFrontendAddCommentPayload }>({
    mutationKey: ['addComment'],
    mutationFn: addCommentService,
    onSuccess: (data) => {
      toast.success('Comment added successfully!');
      queryClient.invalidateQueries({ queryKey: ['post', data._id] }); // Invalidate single post to refetch comments
      queryClient.invalidateQueries({ queryKey: ['posts'] }); // Invalidate list for comment count
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to add comment.');
    },
  });
};

export const useUpdateComment = () => {
  const queryClient = useQueryClient();
  return useMutation<IPostFrontend, Error, { postId: string; commentId: string; newText: string }>({
    mutationKey: ['updateComment'],
    mutationFn: updateCommentService,
    onSuccess: (data) => {
      toast.success('Comment updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['post', data._id] });
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to update comment.');
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, { postId: string; commentId: string }>({
    mutationKey: ['deleteComment'],
    mutationFn: deleteCommentService,
    onSuccess: () => {
      toast.success('Comment deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['posts'] }); // Invalidate posts for comment count
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to delete comment.');
    },
  });
};