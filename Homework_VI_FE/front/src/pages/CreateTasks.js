import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

const CreateTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [category, setCategory] = useState('');
  const [priorities, setPriorities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [dueDate, setDueDate] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchPrioritiesAndCategories = async () => {
      try {
        const token = localStorage.getItem('token');

        // Prioriteetide laadimine
        const prioritiesResponse = await axios.get(
          `${config.api.url}/priorities`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPriorities(prioritiesResponse.data.priorities);

        // Kategooriate laadimine
        const categoriesResponse = await axios.get(
          `${config.api.url}/categories`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCategories(categoriesResponse.data.categories);
      } catch (error) {
        console.error('Error fetching priorities and categories:', error);
      }
    };

    fetchPrioritiesAndCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      const priorityValue = priority || null;
      const categoryValue = category || null;

      //POST requeti saatmine
      const response = await axios.post(
        `${config.api.url}/tasks`,
        {
          title,
          description: description || null,
          priorityId: priorityValue, // Prioriteedi ID võib olla null
          categoryId: categoryValue,  // Kategooria ID võib olla null
          dueDate
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        console.log('Task created successfully!');
        setSuccessMessage('Task created successfully!');
        setTitle('');
        setDescription('');
        setDueDate('');
        setPriority('');
        setCategory('');
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div>
      <h2>Create Task</h2>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <br />
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <br />
        <label>
          Priority:
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="">Select Priority</option>
            {priorities.map((priority) => (
              <option key={priority.id} value={priority.id}>
                {priority.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Category:
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Due Date:
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required/>
        </label>
        <br />
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default CreateTask;