import Conversation from './conversation/conversation';
import Chats from './chats/chats';
import styles from './messgenger.module.scss';

export default function Messenger() {

  return (
    <div className={styles.messenger}>
      <div className={styles.leftColumn}>
        <Chats />
      </div>
      <div className={styles.rightColumn}>
        <Conversation />
      </div>
    </div>
  );
}
