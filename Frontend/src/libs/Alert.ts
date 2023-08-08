import { confirmAlert } from 'react-confirm-alert';

import {
  deleteAdEmailById,
  deleteAdvisorById,
  deleteBannerById,
  deleteHistoryById,
  deleteMouById,
  deletePopupById,
  deletePostById,
  deleteSponsoringCompanyById,
  sendAdEmailAll,
  sendAdEmailOne,
  deletePublicParticipantById,
  deleteSupportingStartupById,
  deleteJudging2ndResultById,
} from '@/api';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Toast } from '@/libs/Toast';

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

export const AlertDeleteHistory = (id: string | number) => {
  confirmAlert({
    title: `${id}번 광고 수신 이메일을 정말로 삭제하시겠습니까?`,
    message: '삭제 후 복구가 불가능합니다.',
    buttons: [
      {
        label: '삭제',
        onClick: () => {
          async function deleteHistory() {
            await deleteHistoryById(id);
            location.reload();
          }
          deleteHistory();
        },
      },
      {
        label: '취소',
      },
    ],
  });
};

export const AlertDeletePopup = (id: string | number) => {
  confirmAlert({
    title: `${id}번 팝업을 정말로 삭제하시겠습니까?`,
    message: '삭제 후 복구가 불가능합니다.',
    buttons: [
      {
        label: '삭제',
        onClick: () => {
          async function deletePopup() {
            await deletePopupById(id);
            location.reload();
          }
          deletePopup();
        },
      },
      {
        label: '취소',
      },
    ],
  });
};

export const AlertSupportingStartup = (id: string | number) => {
  confirmAlert({
    title: `${id}번 스타트업을 정말로 삭제하시겠습니까?`,
    message: '삭제 후 복구가 불가능합니다.',
    buttons: [
      {
        label: '삭제',
        onClick: () => {
          async function deleteSupportingStartup() {
            await deleteSupportingStartupById(id);
            location.reload();
          }
          deleteSupportingStartup();
        },
      },
      {
        label: '취소',
      },
    ],
  });
};

export const AlertSendAdEmailAll = (
  title: string,
  content: string,
  file: string[]
) => {
  confirmAlert({
    title: '수신 동의를 한 전원에게 이메일을 발송하시겠습니까?',
    message: '발송 후 취소가 불가능합니다.',
    buttons: [
      {
        label: '발송',
        onClick: () => {
          async function send() {
            try {
              const res = await sendAdEmailAll(title, content, file);
              if (res.status === 200)
                Toast('성공적으로 발송되었습니다.', 'success');
              else throw new Error(`${res?.data?.message}`);
            } catch (e) {
              Toast(
                `발송에 실패했습니다. ${
                  e?.response?.data?.message ||
                  e?.message ||
                  JSON.stringify(e)
                }`,
                'error'
              );
            }
          }
          send();
        },
      },
      {
        label: '취소',
      },
    ],
  });
};

export const AlertSendAdEmailOne = (
  title: string,
  content: string,
  file: string[],
  email: string
) => {
  confirmAlert({
    title: `${email}님께 이메일을 발송하시겠습니까?`,
    message: '발송 후 취소가 불가능합니다.',
    buttons: [
      {
        label: '발송',
        onClick: () => {
          async function send() {
            try {
              const res = await sendAdEmailOne(
                title,
                content,
                file,
                email
              );
              if (res.status === 200)
                Toast('성공적으로 발송되었습니다.', 'success');
              else throw new Error(`${res?.data?.message}`);
            } catch (e) {
              Toast(
                `발송에 실패했습니다. ${
                  e?.response?.data?.message ||
                  e?.message ||
                  JSON.stringify(e)
                }`,
                'error'
              );
            }
          }
          send();
        },
      },
      {
        label: '취소',
      },
    ],
  });
};
export const AlertDeletePublicParticipant = (id: string | number) => {
  confirmAlert({
    title: `${id}번 공개 행사 참여자을 정말로 삭제하시겠습니까?`,
    message: '삭제 후 복구가 불가능합니다.',
    buttons: [
      {
        label: '삭제',
        onClick: () => {
          async function deletePublicParticipant() {
            await deletePublicParticipantById(id);
            location.reload();
          }
          deletePublicParticipant();
        },
      },
      {
        label: '취소',
      },
    ],
  });
};

export const AlertJudging2ndResultPopup = (id: string | number) => {
  confirmAlert({
    title: `${id}번 2차 심사 결과을 정말로 삭제하시겠습니까?`,
    message: '삭제 후 복구가 불가능합니다.',
    buttons: [
      {
        label: '삭제',
        onClick: () => {
          async function deleteJudgingResult() {
            await deleteJudging2ndResultById(id);
            location.reload();
          }
          deleteJudgingResult();
        },
      },
      {
        label: '취소',
      },
    ],
  });
};
