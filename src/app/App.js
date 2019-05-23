import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
import { setLocalData, getLocalData } from '../services';
import styled from 'styled-components';

import GlobalStyles from '../components/GlobalStyles';
import NewsList from '../newspage/NewsList';
import Form from '../createpage/Form';
import Header from '../components/Header';
import Navigation from '../components/Navigation';

const AppContainer = styled.div`
  position: absolute;
`;

const Main = styled.main`
  display: block;
  margin: 50px 0;
`;
function App() {
  const [newsList, setNewsList] = useState(getLocalData('news') || []);

  function handleFormSubmit(newEntry, history) {
    setNewsList([newEntry, ...newsList]);
    history.push('/');
  }

  useEffect(() => {
    setLocalData('news', newsList);
  });

  return (
    <BrowserRouter>
      <GlobalStyles />
      <AppContainer>
        <Header>
          <NavLink to="/create">+</NavLink>
        </Header>
        <Main>
          <Switch>
            <Route
              path="/create"
              render={props => (
                <Form onFormSubmit={handleFormSubmit} {...props} />
              )}
            />
            <Route path="/" render={() => <NewsList newsList={newsList} />} />
          </Switch>
        </Main>
        <Navigation>
          <NavLink to="/">Home</NavLink>
        </Navigation>
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;
