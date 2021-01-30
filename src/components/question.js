import React, {useEffect, useState} from 'react';
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";


const Sentence = ({sentence, index}) => {
  return (
      <Draggable draggableId={String(index + 1)} index={index}>
        {provided => (
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

  const sntnces = [
    {id: 'clan', content: question_data.clan_option},
    {id: 'adhocracy', content: question_data.adhocracy_option},
    {id: 'market', content: question_data.market_option},
    {id: 'hierarchy', content: question_data.hierarchy_option},
  ]

  const [state, setState] = useState({
    rank1: [],
    rank2: [],
  });

  useEffect(() => {
    let a = sntnces.splice(0,2)
    setState({
      rank1: sntnces,
      rank2: a
    })
  }, [question_data])


  // Reorder the list items
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  let id2List = {
    rank1: 'rank1',
    rank2: 'rank2'
  };

  let getList = id => state[id2List[id]];

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  const grid = 8;

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle
  });

  const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: 500,
  });


  const saveScore = () => {
    let culture = {}
    for (let i = 0; i < state.rank1.length; i++) {
      culture[String(state.rank1[i].id)] = state.rank1.length - i;
    }

    setScores(
        prev => ({
          ...prev,
          [String(questionNumber)]: culture
        })
    )
    advanceQuestion();
  }

  const onDragEnd = result => {
    const {source, destination} = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
          getList(source.droppableId),
          source.index,
          destination.index
      );

      let state = {items};

      if (source.droppableId === 'rank2') {
        state = {selected: items};
      }

      setState(state);
    } else {
      const result = move(
          getList(source.droppableId),
          getList(destination.droppableId),
          source,
          destination
      );

      setState({
        items: result.rank1,
        selected: result.rank2
      });
    }
  };

  console.log("DOING THIS AGAIN");
  return (
    <div className="card">
      <div className="card-body">
        <h3 className="text-center text-uppercase">{question_data.title}</h3>
        <hr />
        <h5 className="card-title text-center">{question_data.question}</h5>
        <div className="d-flex flex-column col-lg-5 mx-auto text-center">
          <DragDropContext onDragEnd={onDragEnd} style={{border: "2px solid green"}}>
            <div className="row">
              <Droppable droppableId="rank1">
                {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} style={getListStyle(snapshot.isDraggingOver)}>
                      {
                        state.rank1.map((s, k) => {
                          return <Sentence sentence={s} index={k} key={k}/>
                        })
                      }
                      {provided.placeholder}
                    </div>
                )}
              </Droppable>
              <Droppable droppableId="rank2" style={{border: "4px solid red"}}>
                {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} style={getListStyle(snapshot.isDraggingOver)}>
                      {
                        state.rank1.map((s, k) => {
                          return <Sentence sentence={s} index={k} key={k}/>
                        })
                      }
                      {provided.placeholder}
                    </div>
                )}
              </Droppable>
            </div>
          </DragDropContext>
        </div>
        <button className="btn btn-primary" onClick={() => saveScore()}>Next</button>
      </div>
    </div>
  );
}

export default Question;
