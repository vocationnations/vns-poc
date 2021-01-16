import React, { useState} from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


const Sentence = ({sentence, index}) => {
  return (
    <Draggable draggableId={String(index+1)} index={index}>
      {(provided, snapshot) => (
          <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
          >
            <span className="btn btn-info mb-2 w-100">{sentence.content}</span>
          </div>
      )}
    </Draggable>
  )
}


const Question = ({question_data, setScores, advanceQuestion, questionNumber}) => {
  const [buttonType, setButtonType] = useState('');
  const [isSelected, setIsSelected] = useState(false);


  const [state, setState] = useState({
    sentences: [
      { id: 'clan', content: question_data.clan_option },
      { id: 'adhocracy', content: question_data.adhocracy_option },
      { id: 'market', content: question_data.market_option },
      { id: 'hierarchy', content: question_data.hierarchy_option },
    ]
  });

  // Reorder the list items
  const reorder = (list, startIndex, endIndex) => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);

      return result;
  };

  const handleOptionSelect = (opt_type) => {
    setButtonType(opt_type);
    setIsSelected(true);
  }

  const saveScore = (type) => {
    setScores(
      prev => ({
        ...prev,
        [String(questionNumber)]: {
          ...prev.[String(questionNumber)],
          [type]: 1
        }
      })
    )
    advanceQuestion();
    setIsSelected(false);
  }

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const sentences = reorder(
      state.sentences,
      result.source.index,
      result.destination.index
    );

    setState({ sentences });
  }

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="text-center text-uppercase">{question_data.title}</h3>
        <hr />
        <h5 className="card-title text-center">{question_data.question}</h5>
        <div className="d-flex flex-column col-lg-5 mx-auto text-center">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="list">
              {provided => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {
                    state.sentences.map((s,k) => {
                      return <Sentence sentence={s} index={k} key={k} />
                    })
                  }
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <button className="btn btn-primary" disabled={!isSelected} onClick={() => saveScore(buttonType)}>Next</button>
      </div>
    </div>
  );
}

export default Question;
