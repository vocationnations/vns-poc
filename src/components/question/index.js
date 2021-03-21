import React, {Component} from 'react';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';

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

class Question extends Component {

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

    constructor(props) {
        super(props)
        this.state = {
            rank1: [
                {id: 'clan', content: this.props.question_data.clan_option},
                {id: 'adhocracy', content: this.props.question_data.adhocracy_option},
                {id: 'market', content: this.props.question_data.market_option},
                {id: 'hierarchy', content: this.props.question_data.hierarchy_option}
            ],
            rank2: [],
            rank3: [],
            rank4: [],
            bin: []
        };
        this.saveScore = this.saveScore.bind(this);
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
            console.log("DROPPING IT IN SAME RANK")
            const items = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

            console.log("ITEMS ARE:")
            console.log(items);

            let state = {items};

            switch (source.droppableId) {
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

    saveScore = () => {

        let domains = {
            'hierarchy': 0,
            'clan': 0,
            'adhocracy': 0,
            'market': 0
        }

        for (let i = 0; i < this.state.rank1.length; i++) {
            let sid = this.state.rank1[i].id
            domains [sid] += 100
        }

        for (let i = 0; i < this.state.rank2.length; i++) {
            let sid = this.state.rank2[i].id
            domains [sid] += 75
        }

        for (let i = 0; i < this.state.rank3.length; i++) {
            let sid = this.state.rank3[i].id
            domains [sid] += 50
        }

        for (let i = 0; i < this.state.rank4.length; i++) {
            let sid = this.state.rank4[i].id
            domains [sid] += 25
        }

        for (let i = 0; i < this.state.bin.length; i++) {
            let sid = this.state.bin[i].id
            domains [sid] -= 25
        }

        this.props.setScores(prev => [...prev, domains])

        this.props.advanceQuestion();
    }

    componentDidUpdate(prevProps) {
        console.log("UPDATING");
        if (prevProps !== this.props) {
            this.setState(
                {
                    rank1: [
                        {id: 'clan', content: this.props.question_data.clan_option},
                        {id: 'adhocracy', content: this.props.question_data.adhocracy_option},
                        {id: 'market', content: this.props.question_data.market_option},
                        {id: 'hierarchy', content: this.props.question_data.hierarchy_option}
                    ],
                    rank2: [],
                    rank3: [],
                    rank4: [],
                    bin: []
                }
            )
        }
    }

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        return (
            <div className="container">
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
                <button className="btn btn-primary" onClick={() => this.saveScore()}>Next</button>
            </div>
        );
    }
}

export default Question;
