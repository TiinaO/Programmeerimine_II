import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';

import config from '../config';
import axios from 'axios';

const TaskList = () => {
  const { authToken } = useAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const response = await axios.get(
          `${config.api.url}/tasks/byuserid/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.status !== 200) {
          throw new Error('Error fetching tasks');
        }


        const tasksWithDetails = await Promise.all(
          response.data.tasks.map(async (task) => {
            try {
              if (task.categoryId) {
                const categoryResponse = await axios.get(
                  `${config.api.url}/categories/${task.categoryId}`,
                  { headers: { Authorization: `Bearer ${token}` } }
                );
                task.categoryName = categoryResponse.data.category.name;
              }
    
              if (task.priorityId) {
                const priorityResponse = await axios.get(
                  `${config.api.url}/priorities/${task.priorityId}`,
                  { headers: { Authorization: `Bearer ${token}` } }
                );
                task.priorityName = priorityResponse.data.priority.name;
                console.log('task.priorityName', task.priorityName);
              }

              if (task.hasSubtasks) {
                const subtasksResponse = await axios.get(
                  `${config.api.url}/subtasks/task/${task.id}`,
                  { headers: { Authorization: `Bearer ${token}` } }
                );
                task.subtasks = subtasksResponse.data.subtasks;
              }

              return task;
            } catch (error) {
              console.error('Error fetching details:', error);
              return task;
            }
          })
        );
    
        setTasks(tasksWithDetails);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [authToken]);

  return (
    <div>
      <h2>User Tasks</h2>
      <ul>
      {tasks && tasks.map(task => (
          <li key={task.id}>
            <div>{task.title}</div>
            <div>
            <div>{task.description}</div>
              <div>{task.dueDate}</div>
              <div>{task.categoryName}</div>
              <div>{task.priorityName}</div>
              <div>{task.completed ? 'Completed' : 'Not Completed'}</div>
              {task.subtasks && (
                <div>
                  <strong>Subtasks:</strong>
                  <ul>
                    {task.subtasks.map(subtask => (
                      <li key={subtask.id}>
                        <div>{subtask.title}</div>
                        <div>{subtask.description}</div>
                        <div>{subtask.completed ? 'Completed' : 'Not Completed'}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;