import { confirmAlert } from 'react-confirm-alert';

import { deletePostById } from '@/api';
import 'react-confirm-alert/src/react-confirm-alert.css';

export const AlertDeletePost = (id: string | number) => {
  confirmAlert({
    title: `${id}번 게시물을 정말로 삭제하시겠습니까?`,
    message: '삭제 후 복구가 불가능합니다.',
    buttons: [
      {
        label: '삭제',
        onClick: () => {
          deletePostById(id).then(() => {
            location.reload();
          });
        },
      },
      {
        label: '취소',
      },
    ],
  });
};
