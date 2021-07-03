import { useHistory, useParams } from 'react-router-dom';

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { Question } from '../components/Question';
import { ToggleButton } from '../components/ToggleButton';

import { database } from '../services/firebase';
import { useRoom } from '../hooks/useRoom';
import { useTheme } from '../hooks/useTheme';

import deleteImg from '../assets/images/delete.svg';
import logoImg from '../assets/images/logo.svg';
import logoDarkImg from '../assets/images/logo-dark.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';

import '../styles/room.scss';
import '../styles/question.scss';

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { theme } = useTheme();

  const { title, questions } = useRoom(roomId);

  async function handleEndRoom() {
    database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })

    history.push('/');
  }

  async function hadleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function hadleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    })
  }

  async function hadleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighLighted: true,
    })
  }

  return (
    <div id="page-wrapper" className={theme}>
      <div id="page-room" className={theme}>
        <header>
          <div className="content">
            {theme === 'light' ? (
              <img src={logoDarkImg} alt="Letmeask" />
            ) : (
              <img src={logoImg} alt="Letmeask" />
            )}
            <div>
              <RoomCode code={roomId}/>
              <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
              <ToggleButton />
            </div>
          </div>
        </header>

        <main>
          <div className="room-title">
            <h1>Sala {title}</h1>
            { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
          </div>

          <div className="question-list">
            {questions.map(question => {
              return (
                <Question
                  key={question.id}
                  content={question.content}
                  author={question.author}
                  isAnswered={question.isAnswered}
                  isHighLighted={question.isHighLighted}
                >
                  {!question.isAnswered && (
                    <>
                      <button
                        type="button"
                        onClick={() => hadleCheckQuestionAsAnswered(question.id)}
                      >
                        <img src={checkImg} alt="Marcar pergunta como respondida" />
                      </button>

                      <button
                        type="button"
                        onClick={() => hadleHighlightQuestion(question.id)}
                      >
                        <img src={answerImg} alt="Dar destaque à pergunta" />
                      </button>
                    </>
                  )}

                  <button
                    type="button"
                    onClick={() => hadleDeleteQuestion(question.id)}
                  >
                    <img src={deleteImg} alt="Deletar pergunta" />
                  </button>
                </Question>
              );
            })}
          </div>
        </main>
      </div>  
    </div>
  )
}