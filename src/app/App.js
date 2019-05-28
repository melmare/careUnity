import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  setLocalData,
  getLocalData,
  postNewsEntry,
  getNews
} from '../services';
import styled from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faList, faUser } from '@fortawesome/free-solid-svg-icons';
import GlobalStyles from '../components/GlobalStyles';
import Navigation from '../components/Navigation';
import CreatePage from '../createpage/CreatePage';
import ToDoPage from '../todopage/ToDoPage';
import NewsPage from '../newspage/NewsPage';
import NavButton from '../components/NavButton';
import Icon from '../components/NavIcon';
import UserPage from '../userpage/UserPage';

library.add(faHome, faList, faUser);

const AppContainer = styled.div`
  position: absolute;
  width: 100vw;
`;

function App() {
  const [newsList, setNewsList] = useState(getLocalData('news') || []);
  const [toDos, setToDos] = useState(getLocalData('toDos') || []);
  const [user, setUser] = useState(getLocalData('user') || 'User');

  function handleNewsFormSubmit(newEntry, history) {
    postNewsEntry(newEntry)
      .then(newEntry => setNewsList([newEntry, ...newsList]))
      .catch(err => console.log(err));
    history.push('/news');
  }

  useEffect(() => {
    setLocalData('news', newsList);
  }, [newsList]);

  useEffect(() => {
    getNews().then(newsList => setNewsList(newsList.reverse()));
  }, [newsList]);

  function handleToDoSubmit(newToDo) {
    setToDos([newToDo, ...toDos]);
  }

  function handleToDoStatusChange(changedToDo) {
    const index = toDos.findIndex(toDo => toDo.title === changedToDo.title);
    setToDos([
      ...toDos.slice(0, index),
      changedToDo,
      ...toDos.slice(index + 1)
    ]);
  }

  function handleToDoDistribution(distribuedToDo) {
    const index = toDos.findIndex(toDo => toDo.title === distribuedToDo.title);
    setToDos([
      ...toDos.slice(0, index),
      distribuedToDo,
      ...toDos.slice(index + 1)
    ]);
  }

  function handleToDoDelete(deletedToDo) {
    const index = toDos.findIndex(toDo => toDo.title === deletedToDo.title);
    setToDos([...toDos.slice(0, index), ...toDos.slice(index + 1)]);
  }

  useEffect(() => setLocalData('toDos', toDos), [toDos]);

  function handleUserChange(newUser) {
    setUser(newUser);
  }

  useEffect(() => setLocalData('user', user), [user]);

  return (
    <BrowserRouter>
      <GlobalStyles />
      <AppContainer>
        <Switch>
          <Route
            path="/create"
            render={props => (
              <CreatePage
                onFormSubmit={handleNewsFormSubmit}
                history={props.history}
              />
            )}
          />
          <Route
            path="/todo"
            render={props => (
              <ToDoPage
                toDos={toDos}
                user={user}
                onToDoSubmit={handleToDoSubmit}
                onToDoStatusChange={handleToDoStatusChange}
                onToDoDelete={handleToDoDelete}
                onToDoDistribution={handleToDoDistribution}
              />
            )}
          />
          <Route
            path="/user"
            render={() => (
              <UserPage onUserChange={handleUserChange} user={user} />
            )}
          />
          <Route path="/" render={() => <NewsPage newsList={newsList} />} />
        </Switch>
        <Navigation>
          <NavButton to="/">
            <Icon icon="home" />
          </NavButton>
          <NavButton to="/todo">
            <Icon icon="list" />
          </NavButton>
          <NavButton to="/user">
            <Icon icon="user" />
          </NavButton>
        </Navigation>
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;
