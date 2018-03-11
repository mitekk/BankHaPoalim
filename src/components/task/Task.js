import React from 'react';
import { Button } from 'reactstrap';

const Task = (props) => {
    return (
        <Button 
        className="task-container" 
        size="sm" 
        onClick={() => props.onTaskSelect(props.task.id)}
        block>{props.task.name}</Button>
        // <div className="task-container" onClick={() => props.onTaskSelect(props.task.id)}>
        //     {props.task.name}
        // </div>
    );
};

export default Task;