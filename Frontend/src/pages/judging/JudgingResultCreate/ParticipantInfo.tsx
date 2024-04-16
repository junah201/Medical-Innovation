import { Message } from '@/components';
import { FileLink } from '@/components/FileLink';
import { JudgingParticipant } from '@/types';

interface ParticipantInfoProps {
  data: JudgingParticipant | undefined;
}

const ParticipantInfo = ({
  data,
}: ParticipantInfoProps) => {
  return (
    <>
      <Message>
        신청자 : {data?.application?.name || '로딩중 ...'}
        <br />
        소속 :{' '}
        {data?.application?.organization_name ||
          '로딩중 ...'}
        <br />
        <FileLink
          filename={data?.application?.zip_filename}
          label="제출서류 다운로드"
        />
      </Message>
    </>
  );
};

export default ParticipantInfo;
