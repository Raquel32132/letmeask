import { useTheme } from '../hooks/useTheme';

import copyImg from '../assets/images/copy.svg';
import '../styles/room-code.scss';

type RoomCodeProps = {
    code: string;
}

export function RoomCode(props: RoomCodeProps) {
  const { theme } = useTheme();

  function copyRoomCodeToClipboard() {
      navigator.clipboard.writeText(props.code)
  }

  return (
    <button id="room-code" className={theme} onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copiar código da sala" />
      </div>
      <span>Sala #{props.code}</span>
    </button>
  )
}