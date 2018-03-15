import React from 'react';
import { Button } from 'reactstrap';

const Task = (props) => {
    return (
        <Button
            className={`task-container ${props.alertClass}`}
            size="sm"
            onClick={() => props.onTaskSelected(props.task)}
            block>{props.task.name}</Button>
    );
};

export default Task;