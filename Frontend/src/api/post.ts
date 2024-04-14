import { API_ROUTE } from '@/constants';
import { Axios } from '@/libs/Axios';
import { Post, PostList, Board } from '@/types';

const unAuthAxios = new Axios();
const authAxios = new Axios(true);

export const getPosts = async (
  skip: number,
  limit: number
) => {
  const res = await unAuthAxios.getByParams(
    API_ROUTE.POST.GET_POSTS,
    {
      skip: skip,
      limit: limit,
    }
  );

  return res;
};

export const getPostsByBoardId = async (
  boardId: number | string,
  skip: number,
  limit: number
) => {
  const res =
    await unAuthAxios.getByParams<PostList>(
      API_ROUTE.POST.GET_POSTS_BY_BOARD(boardId),
      {
        skip: skip,
        limit: limit,
      }
    );

  return res;
};

export const getPostById = async (
  id: number | string
) => {
  const res = await unAuthAxios.get<Post>(
    API_ROUTE.POST.GET_POST_BY_ID(id)
  );

  return res;
};

export const getPostBoards = async (
  skip: number,
  limit: number
) => {
  const res = await authAxios.getByParams<
    Board[]
  >(API_ROUTE.POST.GET_POST_BOARDS, {
    skip: skip,
    limit: limit,
  });

  return res;
};

export const uploadPost = async (
  title: string,
  boardId: number | string,
  content: string,
  files: File[]
) => {
  const formData = new FormData();

  formData.append('title', title);
  formData.append('board_id', boardId);
  formData.append('content', content);
  files.forEach((file) => {
    formData.append('files', file);
  });

  const res =
    await authAxios.postMultipartFormData(
      API_ROUTE.POST.UPLOAD_POST,
      formData
    );

  return res;
};

interface PostCreate {
  title: string;
  board_id: number | string;
  content: string;
  files: string[];
}

export const uploadPostV2 = async (
  userInput: PostCreate
) => {
  const res = await authAxios.post(
    API_ROUTE.POST_V2.UPLOAD_POST,
    userInput
  );

  return res;
};

export const updatePostById = async (
  id: number | string,
  title: string,
  boardId: number | string,
  content: string
) => {
  const res = await authAxios.put(
    API_ROUTE.POST.UPDATE_POST_BY_ID(id),
    {
      title: title,
      board_id: boardId,
      content: content,
    }
  );

  return res;
};

interface PostUpdate {
  title: string;
  board_id: number | string;
  content: string;
  files: string[];
}

export const updatePostByIdV2 = async (
  id: number | string,
  userInput: PostUpdate
) => {
  const res = await authAxios.put(
    API_ROUTE.POST_V2.UPDATE_POST_BY_ID(id),
    userInput
  );

  return res;
};

export const deletePostById = async (
  id: number | string
) => {
  const res = await authAxios.delete(
    API_ROUTE.POST.DELETE_POST_BY_ID(id)
  );

  return res;
};
