import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { setLocalData, getLocalData } from '../services';
import styled from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faList } from '@fortawesome/free-solid-svg-icons';
import GlobalStyles from '../components/GlobalStyles';
import Navigation from '../components/Navigation';
import CreatePage from '../createpage/CreatePage';
import ToDoPage from '../todopage/ToDoPage';
import NewsPage from '../newspage/NewsPage';
import NavButton from '../components/NavButton';
import Icon from '../components/NavIcon';

library.add(faHome, faList);

const AppContainer = styled.div`
  position: absolute;
  width: 100vw;
`;

function App() {
  const [newsList, setNewsList] = useState(getLocalData('news') || []);
  const [toDos, setToDos] = useState(getLocalData('toDos') || []);

  function handleNewsFormSubmit(newEntry, history) {
    setNewsList([newEntry, ...newsList]);
    history.push('/');
  }

  useEffect(() => setLocalData('news', newsList), [newsList]);

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
  function handleToDoDelete(deletedToDo) {
    const index = toDos.findIndex(toDo => toDo.title === deletedToDo.title);
    setToDos([...toDos.slice(0, index), ...toDos.slice(index + 1)]);
  }

  useEffect(() => setLocalData('toDos', toDos), [toDos]);

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
                onToDoSubmit={handleToDoSubmit}
                onToDoStatusChange={handleToDoStatusChange}
                onToDoDelete={handleToDoDelete}
              />
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
        </Navigation>
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;
