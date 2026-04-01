import React, { useState } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import NotificationToast from '../components/common/NotificationToast';
import { financialTips, quizQuestions } from '../utils/helpers';

export default function LearnPage({ darkMode }) {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleQuizAnswer = (questionId, answerIndex) => {
    if (!submitted) {
      setAnswers((prev) => ({ ...prev, [questionId]: answerIndex }));
    }
  };

  const handleSubmitQuiz = () => {
    if (Object.keys(answers).length === quizQuestions.length) {
      setSubmitted(true);
      const score = quizQuestions.filter(
        (q) => answers[q.id] === q.correct
      ).length;
      setNotification({
        msg: `Quiz completed! You scored ${score}/${quizQuestions.length}`,
        type: 'success',
      });
    } else {
      setNotification({
        msg: 'Please answer all questions',
        type: 'error',
      });
    }
  };

  const resetQuiz = () => {
    setSelectedQuiz(null);
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-dark-bg' : 'bg-gray-50'} p-4 md:p-8`}>
      <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-8`}>
        📚 Learn Finance
      </h1>

      {!selectedQuiz ? (
        <>
          {/* Financial Tips */}
          <div className="mb-12">
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
              Financial Tips
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {financialTips.map((tip, idx) => (
                <Card key={idx} darkMode={darkMode} className="hover:shadow-2xl transition-shadow">
                  <div className="text-4xl mb-3">{tip.icon}</div>
                  <h3 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {tip.title}
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {tip.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* Quiz Section */}
          <div>
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
              Test Your Knowledge
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quizQuestions.map((quiz) => (
                <Card
                  key={quiz.id}
                  darkMode={darkMode}
                  className="cursor-pointer hover:shadow-2xl transition-shadow"
                  onClick={() => setSelectedQuiz(quiz.id)}
                >
                  <div className="text-5xl mb-4">❓</div>
                  <p className={`font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {quiz.question}
                  </p>
                  <Button variant="secondary" size="sm">
                    Take Quiz
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* Quiz Modal */
        <div className="max-w-2xl mx-auto">
          <Button
            variant="outline"
            onClick={resetQuiz}
            className="mb-6"
          >
            ← Back to Quizzes
          </Button>

          <Card darkMode={darkMode}>
            {quizQuestions.map((question) => (
              <div key={question.id} className="mb-8">
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                  {question.question}
                </h2>

                <div className="space-y-3 mb-6">
                  {question.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuizAnswer(question.id, idx)}
                      disabled={submitted}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                        answers[question.id] === idx
                          ? submitted
                            ? idx === question.correct
                              ? 'border-green-500 bg-green-50'
                              : 'border-red-500 bg-red-50'
                            : 'border-primary bg-green-50'
                          : darkMode
                          ? 'border-gray-700 hover:border-primary'
                          : 'border-gray-300 hover:border-primary'
                      }`}
                    >
                      <div className={`font-medium ${darkMode && !submitted ? 'text-white' : ''}`}>
                        {String.fromCharCode(65 + idx)}. {option}
                      </div>
                    </button>
                  ))}
                </div>

                {submitted && (
                  <div
                    className={`${
                      answers[question.id] === question.correct ? 'bg-green-50' : 'bg-orange-50'
                    } border rounded-lg p-4 mb-6`}
                  >
                    <p className={`font-bold ${answers[question.id] === question.correct ? 'text-green-800' : 'text-orange-800'}`}>
                      {answers[question.id] === question.correct ? '✓ Correct!' : '✗ Not quite right'}
                    </p>
                    <p className={`text-sm ${answers[question.id] === question.correct ? 'text-green-700' : 'text-orange-700'}`}>
                      {question.explanation}
                    </p>
                  </div>
                )}
              </div>
            ))}

            {!submitted && (
              <Button
                variant="primary"
                size="lg"
                onClick={handleSubmitQuiz}
                className="w-full"
              >
                Submit Quiz
              </Button>
            )}

            {submitted && (
              <Button
                variant="secondary"
                size="lg"
                onClick={resetQuiz}
                className="w-full"
              >
                Try Another Quiz
              </Button>
            )}
          </Card>
        </div>
      )}

      {notification && (
        <NotificationToast
          message={notification.msg}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}
