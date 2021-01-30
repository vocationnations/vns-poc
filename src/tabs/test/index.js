import React, {Component, useState} from 'react';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

// fake data generator
const getItems = (count, offset = 0) =>
    Array.from({length: count}, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        content: `item ${k + offset}`
    }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
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
    width: 100,
});

class TestTab extends Component {

    question_data = this.props.question_data;

    sentences = [
        {id: 'clan', content: this.question_data.clan_option},
        {id: 'adhocracy', content: this.question_data.adhocracy_option},
        {id: 'market', content: this.question_data.market_option},
        {id: 'hierarchy', content: this.question_data.hierarchy_option},
    ]


    state = {
        rank1: this.sentences,
        rank2: [],
        rank3: [],
        rank4: [],
        bin: []
    };

    /**
     * A semi-generic way to handle multiple lists. Matches
     * the IDs of the droppable container to the names of the
     * source arrays stored in the state.
     */
    id2List = {
        rank1: 'rank1',
        rank2: 'rank2',
        rank3: 'rank3',
        rank4: 'rank4',
        bin: 'bin'
    };

    getList = id => this.state[this.id2List[id]];

    onDragEnd = result => {
        const {source, destination} = result;

        // dropped outside the list
        // TODO: add to bin
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
          console.log("DROPPING IT IN SAME RANK")
            const items = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

            console.log("ITEMS ARE:")
            console.log(items);

            let state = {items};

            switch(source.droppableId) {
                case 'rank1':
                    state = {rank1: items};
                    break;
                case 'rank2':
                    state = {rank2: items};
                    break;
                case 'rank3':
                    state = {rank3: items};
                    break;
                case 'rank4':
                    state = {rank4: items};
                    break;
                case 'bin':
                    state = {bin: items};
                    break;

                default:
                    break;
            }

            this.setState(state);
        } else {
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );


            const newState = this.state;
                  newState[source.droppableId] = result[source.droppableId];
                  newState[destination.droppableId] = result[destination.droppableId];

            this.setState({ newState });
        }
    };

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div className="row">
                    <Droppable droppableId="rank1">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                className="mr-5"
                                style={getListStyle(snapshot.isDraggingOver)}>
                                {this.state.rank1.map((item, index) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}>
                                                {item.content}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <Droppable droppableId="rank2">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                className="mr-5"
                                style={getListStyle(snapshot.isDraggingOver)}>
                                {this.state.rank2.map((item, index) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}>
                                                {item.content}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <Droppable droppableId="rank3">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                className="mr-5"
                                style={getListStyle(snapshot.isDraggingOver)}>
                                {this.state.rank3.map((item, index) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}>
                                                {item.content}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <Droppable droppableId="rank4">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                className="mr-5"
                                style={getListStyle(snapshot.isDraggingOver)}>
                                {this.state.rank4.map((item, index) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}>
                                                {item.content}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <Droppable droppableId="bin">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                className="mr-5"
                                style={getListStyle(snapshot.isDraggingOver)}>
                                {this.state.bin.map((item, index) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}>
                                                {item.content}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>

                </div>
            </DragDropContext>
        );
    }
}

export default TestTab;
