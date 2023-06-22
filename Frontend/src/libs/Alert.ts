import { confirmAlert } from 'react-confirm-alert';

import {
  deleteBannerById,
  deleteMouById,
  deletePostById,
  deleteSponsoringCompanyById,
} from '@/api';
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

export const AlertDeletBanner = (id: string | number) => {
  confirmAlert({
    title: `${id}번 배너를 정말로 삭제하시겠습니까?`,
    message: '삭제 후 복구가 불가능합니다.',
    buttons: [
      {
        label: '삭제',
        onClick: () => {
          deleteBannerById(id).then(() => {
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

export const AlertDeleteSponsoringCompany = (id: string | number) => {
  confirmAlert({
    title: `${id}번 후원 기업를 정말로 삭제하시겠습니까?`,
    message: '삭제 후 복구가 불가능합니다.',
    buttons: [
      {
        label: '삭제',
        onClick: () => {
          deleteSponsoringCompanyById(id).then(() => {
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

export const AlertDeleteMou = (id: string | number) => {
  confirmAlert({
    title: `${id}번 MOU를 정말로 삭제하시겠습니까?`,
    message: '삭제 후 복구가 불가능합니다.',
    buttons: [
      {
        label: '삭제',
        onClick: () => {
          deleteMouById(id).then(() => {
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
