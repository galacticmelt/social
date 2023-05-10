import { CardContent, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import { normalizeMessageTime } from '../../../shared/helpers';
import { styled } from '@mui/material';
import styles from './message-item.module.scss';

const CardContentStyled = styled(CardContent)(`
  padding: 0;
  &:last-child {
    padding-bottom: 0;
  };
`);

interface MessageItemProps {
  isCompanion: boolean;
  text: string;
  time: string;
}

export default function MessageItem({ isCompanion, text, time }: MessageItemProps) {
  return (
    <div className={isCompanion ? styles.messageWrapperL : styles.messageWrapperR}>
      <div className={styles.messageItem}>
        <Card
          raised
          sx={{
            bgcolor: isCompanion ? '#1976d2' : 'white',
            color: isCompanion ? 'white' : 'black',
            wordBreak: 'break-word',
            borderTopRightRadius: '15px',
            borderTopLeftRadius: '15px',
            borderBottomLeftRadius: isCompanion ? 'none' : '15px',
            borderBottomRightRadius: isCompanion ? '15px' : 'none'
          }}
        >
          <CardContentStyled sx={{ px: 1, pt: 1 }}>
            <Typography>{text}</Typography>
            <div className={styles.messageItemTime}>
              <Typography variant="caption" color={isCompanion ? 'white' : 'grey'}>
                {normalizeMessageTime(time)}
              </Typography>
            </div>
          </CardContentStyled>
        </Card>
      </div>
    </div>
  );
}
