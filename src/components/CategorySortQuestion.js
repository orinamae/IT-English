//curently doesnt function correctly

import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './CategorySortQuestion.css';

const CategorySortQuestion = ({ question, onAnswerSubmit }) => {
  const [userAnswer, setUserAnswer] = useState({});
  const [wordList, setWordList] = useState([]);

  useEffect(() => {
    const initialUserAnswer = {};
    question.categories.forEach((category) => {
      initialUserAnswer[category] = [];
    });
    setUserAnswer(initialUserAnswer);
    setWordList(question.words);
  }, [question.categories, question.words]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceCategory = source.droppableId;
    const destinationCategory = destination.droppableId;

    if (sourceCategory === destinationCategory) {
      const updatedItems = [...userAnswer[sourceCategory]];
      const [removedItem] = updatedItems.splice(source.index, 1);
      updatedItems.splice(destination.index, 0, removedItem);

      setUserAnswer({
        ...userAnswer,
        [sourceCategory]: updatedItems,
      });
    } else {
      const updatedSourceItems = [...userAnswer[sourceCategory]];
      const [removedItem] = updatedSourceItems.splice(source.index, 1);

      const updatedDestinationItems = [...userAnswer[destinationCategory]];
      updatedDestinationItems.splice(destination.index, 0, removedItem);

      setUserAnswer({
        ...userAnswer,
        [sourceCategory]: updatedSourceItems,
        [destinationCategory]: updatedDestinationItems,
      });
    }
  };

  const handleWordClick = (word) => {
    const firstCategory = question.categories[0];
    setUserAnswer({
      ...userAnswer,
      [firstCategory]: [...userAnswer[firstCategory], word],
    });
    setWordList(wordList.filter((w) => w !== word));
  };

  const handleSubmit = () => {
    onAnswerSubmit(userAnswer);
  };

  return (
    <div className="category-sort-container">
      <p className="question-text">{question.questionText}</p>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="categories-container">
          {question.categories.map((category) => (
            <Droppable key={category} droppableId={category}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="category-container"
                >
                  <h3 className="category-title">{category}</h3>
                  <div className="category-items">
                    {userAnswer[category].map((item, index) => (
                      <Draggable key={item} draggableId={item} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="category-item"
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
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
      <div className="word-list">
        {wordList.map((word) => (
          <button
            key={word}
            onClick={() => handleWordClick(word)}
            disabled={Object.values(userAnswer).flat().includes(word)}
            className="word-button"
          >
            {word}
          </button>
        ))}
      </div>
      <button onClick={handleSubmit} className="submit-button">
        Submit
      </button>
    </div>
  );
};

export default CategorySortQuestion;
