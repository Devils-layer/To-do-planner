import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'
import styled from "styled-components";
import dayjs from 'dayjs'
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const url = "http://localhost:3001"
  useEffect(() => {
    axios.get(`${url}/api/tasks`)
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleAddTask = () => {
    if (title === "" || description === "" || date === "") {
      alert("Please fill all the information!")
    }else {
      axios.post(`${url}/api/tasks`, { title, description, date })
      .then(response => {
        setTasks([...tasks, response.data]);
        setTitle('');
        setDescription('');
        setDate('');
      })
      .catch(error => {
        console.error(error);
      });
    }
    
  };

  const handleCompleteTask = (id) => {
    axios.patch(`${url}/api/tasks/${id}`)
      .then(response => {
        setTasks(tasks.map(task => (task._id === id ? { ...task, completed: true } : task)));
      })
      .catch(error => {
        console.error(error);
      });
  };

  
    return (
      <Container>
        <Header>ToDo Planner</Header>
        <TaskForm>
          <Input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextArea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></TextArea>
          <DateInput
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <AddButton onClick={handleAddTask}>Add Task</AddButton>
        </TaskForm>
        <TaskListContainer>
          <TasksHeader>Tasks</TasksHeader>
          <TaskList>
            {tasks.map((task) => (
              <TaskItem key={task._id}>
                <TaskTitle>{task.title}</TaskTitle>
                <TaskDescription>{task.description}</TaskDescription>
                <TaskDate>{dayjs(task.date).format('YYYY/MM/DD')}</TaskDate>
                {!task.completed && (
                  <CompleteButton onClick={() => handleCompleteTask(task._id)}>
                    Complete
                  </CompleteButton>
                )}
              </TaskItem>
            ))}
          </TaskList>
        </TaskListContainer>
      </Container>
    );
  };
  
  const Container = styled.div`
    background-color: #282c34;
    width: 1280px;
    color: white;
    text-align: center;
    padding: 20px;
  `;
  
  const Header = styled.h1`
    color: #61dafb;
  `;
  
  const TaskForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  `;
  
  const Input = styled.input`
    padding: 10px;
    border: 1px solid #61dafb;
    border-radius: 4px;
    margin: 8px;
    width: 80%;
    max-width: 300px;
    font-size: 16px;
  `;
  
  const TextArea = styled.textarea`
    padding: 10px;
    border: 1px solid #61dafb;
    border-radius: 4px;
    margin: 8px;
    width: 80%;
    max-width: 300px;
    height: 80px;
    font-size: 16px;
  `;
  
  const DateInput = styled.input`
    padding: 10px;
    border: 1px solid #61dafb;
    border-radius: 4px;
    margin: 8px;
    width: 80%;
    max-width: 300px;
    font-size: 16px;
  `;
  
  const AddButton = styled.button`
    background-color: #61dafb;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  `;
  
  const TaskListContainer = styled.div`
    margin-top: 20px;
  `;
  
  const TasksHeader = styled.h2`
    color: #61dafb;
  `;
  
  const TaskList = styled.ul`
    list-style: none;
    padding: 0;
  `;
  
  const TaskItem = styled.li`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #61dafb;
    border-radius: 8px;
    padding: 16px;
    margin: 16px 0;
    background-color: #333;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  `;
  
  const TaskTitle = styled.div`
    font-weight: bold;
    margin-bottom: 8px;
  `;
  
  const TaskDescription = styled.div`
    color: #ccc;
    margin-bottom: 8px;
  `;
  
  const TaskDate = styled.div`
    font-style: italic;
    color: #ccc;
    margin-bottom: 8px;
  `;
  
  const CompleteButton = styled.button`
    background-color: #61dafb;
    color: white;
    padding: 8px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  `;
  
  export default App;
  