import { API_ROUTE } from '@/constants';
import { Axios } from '@/libs/Axios';

const unAuthAxios = new Axios();
const authAxios = new Axios(true);

export const getPostsByBoardId = async (boardId: number, skip: number, limit: number) => {
  const res = await unAuthAxios.getByParams(API_ROUTE.POST.GET_POSTS_BY_BOARD(boardId), {
    board_id: boardId,
    skip: skip,
    limit: limit,
  });

  return res;
};
