import { Message, PostContent } from '@/components';
import { JudgingEvent } from '@/types';

interface InfoProps {
  data: JudgingEvent;
}

const Info = ({ data }: InfoProps) => {
  return (
    <Message>
      <PostContent content={data.description} />
    </Message>
  );
};

export default Info;
