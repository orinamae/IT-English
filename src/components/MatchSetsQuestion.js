//barely works
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './MatchSetsQuestion.css';
const MatchSetsQuestion = ({ question, onAnswerSubmit }) => {
  const [userAnswer, setUserAnswer] = useState([]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    const updatedAnswer = [...userAnswer];
    const [removedItem] = updatedAnswer.splice(sourceIndex, 1);
    updatedAnswer.splice(destinationIndex, 0, removedItem);

    setUserAnswer(updatedAnswer);
  };

  const handleSubmit = () => {
    onAnswerSubmit(userAnswer);
  };

  return (
    <div className="match-sets-container">
      <p className="question-text">{question.questionText}</p>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="answer-area" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="answer-area"
            >
              {userAnswer.map((item, index) => (
                <Draggable key={item} draggableId={item} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="answer-item"
                      style={{
                        ...provided.draggableProps.style,
                      }}
                    >
                      {item}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className="option-sets">
        <div className="option-set">
          {question.set1.map((item) => (
            <button
              key={item}
              onClick={() => setUserAnswer([...userAnswer, item])}
              disabled={userAnswer.includes(item)}
              className="option-button"
            >
              {item}
            </button>
          ))}
        </div>
        <div className="option-set">
          {question.set2.map((item) => (
            <button
              key={item}
              onClick={() => setUserAnswer([...userAnswer, item])}
              disabled={userAnswer.includes(item)}
              className="option-button"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <button onClick={handleSubmit} className="submit-button">
        Submit
      </button>
    </div>
  );
};

export default MatchSetsQuestion;