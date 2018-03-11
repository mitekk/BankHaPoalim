import React from 'react';

const Task = (props) => {
    return (
        <div className="task-container" onClick={() => props.onTaskSelect(props.task.id)}>
            {props.task.name}
        </div>
    );
};

export default Task;