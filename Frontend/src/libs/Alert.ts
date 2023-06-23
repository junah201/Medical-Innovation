import { confirmAlert } from 'react-confirm-alert';

import {
  deleteAdEmailById,
  deleteAdvisorById,
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
          async function deletePost() {
            await deletePostById(id);
            location.reload();
          }
          deletePost();
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
          async function deleteBanner() {
            await deleteBannerById(id);
            location.reload();
          }
          deleteBanner();
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
          async function deleteSponsoringCompany() {
            await deleteSponsoringCompanyById(id);
            location.reload();
          }
          deleteSponsoringCompany();
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
          async function deleteMou() {
            await deleteMouById(id);
            location.reload();
          }
          deleteMou();
        },
      },
      {
        label: '취소',
      },
    ],
  });
};

export const AlertDeleteAdvisor = (id: string | number) => {
  confirmAlert({
    title: `${id}번 자문단을 정말로 삭제하시겠습니까?`,
    message: '삭제 후 복구가 불가능합니다.',
    buttons: [
      {
        label: '삭제',
        onClick: () => {
          async function deleteAdvisor() {
            await deleteAdvisorById(id);
            location.reload();
          }
          deleteAdvisor();
        },
      },
      {
        label: '취소',
      },
    ],
  });
};

export const AlertDeleteAdEmail = (id: string | number) => {
  confirmAlert({
    title: `${id}번 광고 수신 이메일을 정말로 삭제하시겠습니까?`,
    message: '삭제 후 복구가 불가능합니다.',
    buttons: [
      {
        label: '삭제',
        onClick: () => {
          async function deleteAdEmail() {
            await deleteAdEmailById(id);
            location.reload();
          }
          deleteAdEmail();
        },
      },
      {
        label: '취소',
      },
    ],
  });
};
