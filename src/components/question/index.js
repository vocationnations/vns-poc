import React, {Component} from 'react';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';

import './question.css'

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

class Question extends Component {


    /**
     * A semi-generic way to handle multiple lists. Matches
     * the IDs of the droppable container to the names of the
     * source arrays stored in the state.
     */
    id2List = {
        rank0: 'rank0',
        rank1: 'rank1',
        rank2: 'rank2',
        rank3: 'rank3',
        rank4: 'rank4',
        bin: 'bin'
    };

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.question_data.title,
            rank0: [
                {id: 'clan', content: this.props.question_data.clan_option},
                {
                    id: 'adhocracy',
                    content: this.props.question_data.adhocracy_option
                },
                {id: 'market', content: this.props.question_data.market_option},
                {
                    id     : 'hierarchy',
                    content: this.props.question_data.hierarchy_option
                },
            ],
            rank1: [],
            rank2: [],
            rank3: [],
            rank4: [],
            bin: []
        }

        this.saveScore             = this.saveScore.bind(this);
        this.calculateScoreForClan = this.calculateScoreForClan.bind(this)

    }

    getList = id => this.state[this.id2List[id]];

    onDragEnd = result => {
        const {source, destination} = result;

        // dropped outside the list
        // TODO: add to bin
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

            let state = {items};

            switch (source.droppableId) {
                case 'rank0':
                    state = {rank0: items};
                    break;
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

            this.setState({newState});
        }
    };

    componentDidUpdate(prevProps, prevState) {

        if (prevProps.question_data.title !== this.props.question_data.title) {
            console.log(this.props.question_data);
            let new_state = {
                rank0: [
                    {id: 'clan', content: this.props.question_data.clan_option},
                    {
                        id: 'adhocracy',
                        content: this.props.question_data.adhocracy_option
                    },
                    {
                        id: 'market',
                        content: this.props.question_data.market_option
                    },
                    {
                        id: 'hierarchy',
                        content: this.props.question_data.hierarchy_option
                    },
                ],
                rank1: [],
                rank2: [],
                rank3: [],
                rank4: [],
                bin  : []
            }
            this.setState(new_state)
        }

    }

    calculateScoreForClan = (state) => {
        let adhocracy = 0
        let market    = 0
        let hierarchy = 0
        let clan      = 0

        // initial state
        state.rank0.forEach(r => {
            switch (r.id) {
                case "clan":
                    clan += 0
                    break;
                case "adhocracy":
                    adhocracy += 0
                    break;
                case "market":
                    market += 0;
                    break;
                case "hierarchy":
                    hierarchy += 0
                    break;
                default:
                    break;
            }
        })
        state.rank1.forEach(r => {
            switch (r.id) {
                case "clan":
                    clan += 100
                    break;
                case "adhocracy":
                    adhocracy += 100
                    break;
                case "market":
                    market += 100;
                    break;
                case "hierarchy":
                    hierarchy += 100
                    break;
                default:
                    break;
            }
        })
        state.rank2.forEach(r => {
            switch (r.id) {
                case "clan":
                    clan += 75
                    break;
                case "adhocracy":
                    adhocracy += 75
                    break;
                case "market":
                    market += 75;
                    break;
                case "hierarchy":
                    hierarchy += 75
                    break;
                default:
                    break;
            }
        })
        state.rank3.forEach(r => {
            switch (r.id) {
                case "clan":
                    clan += 50
                    break;
                case "adhocracy":
                    adhocracy += 50
                    break;
                case "market":
                    market += 50;
                    break;
                case "hierarchy":
                    hierarchy += 50
                    break;
                default:
                    break;
            }
        })
        state.rank4.forEach(r => {
            switch (r.id) {
                case "clan":
                    clan += 25
                    break;
                case "adhocracy":
                    adhocracy += 25
                    break;
                case "market":
                    market += 25;
                    break;
                case "hierarchy":
                    hierarchy += 25
                    break;
                default:
                    break;
            }
        })
        state.bin.forEach(r => {
            switch (r.id) {
                case "clan":
                    clan -= 25
                    break;
                case "adhocracy":
                    adhocracy -= 25
                    break;
                case "market":
                    market -= 25;
                    break;
                case "hierarchy":
                    hierarchy -= 25
                    break;
                default:
                    break;
            }
        })

        return {
            "adhocracy": adhocracy,
            "market"   : market,
            "clan"     : clan,
            "hierarchy": hierarchy
        }

    }

    saveScore = () => {

        console.log("SAVING SCORE...")
        const user_answer = {
            "question_title": this.props.question_data.title,
            "question"      : this.props.question_data.question,
            "answer"        : this.state

        }

        let numerical_scores = this.calculateScoreForClan(this.state)
        this.props.setNumericalScores(
            prev => {
                return {
                    adhocracy: prev.adhocracy + numerical_scores.adhocracy,
                    hierarchy: prev.hierarchy + numerical_scores.hierarchy,
                    clan     : prev.clan + numerical_scores.clan,
                    market   : prev.market + numerical_scores.market,
                }
            }
        )


        this.props.setData(
            prev => [...prev, user_answer]
        )

        this.props.advanceQuestion();
    }

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        return this.props.question_data !== null && (
            <div className="container-fluid w-100 p-0">
                <h5 className="text-left">{this.props.question_data.question}</h5>
                <hr/>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <div className="row justify-content-center">
                        <Droppable droppableId="rank0">
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    className="mr-2 w-15 rank0 p-0">
                                    <strong>Unspecified</strong>
                                    {this.state.rank0.map((item, index) => (
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
                        <Droppable droppableId="rank1">
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    className="mr-2 w-15 rank1 p-2">
                                    <strong>Strongly Agree</strong>
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
                                    className="mr-2 w-15 rank2 p-2">
                                    <strong>Agree</strong>
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
                                    className="mr-2 w-15 rank3 p-2">
                                    <strong>Neutral</strong>
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
                                    className="mr-2 w-15 rank4 p-2">
                                    <strong>Disagree</strong>
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
                                    className="mr-2 w-15 bin p-2">
                                    <strong>Strongly Disagree</strong>
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
                <hr/>
                <button className="btn btn-primary"
                        onClick={() => this.saveScore()}>Next Question
                </button>
                <br/><br/>
            </div>
        );
    }
}

export default Question;
