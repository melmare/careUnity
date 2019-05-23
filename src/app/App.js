import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
import { setLocalData, getLocalData } from '../services';
import styled from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import GlobalStyles from '../components/GlobalStyles';
import Navigation from '../components/Navigation';
import CreatePage from '../createpage/CreatePage';
import NewsPage from '../newspage/NewsPage';
import NavButton from '../components/NavButton';
import Icon from '../components/NavIcon';

library.add(faHome);

const AppContainer = styled.div`
  position: absolute;
`;

const Main = styled.main`
  display: block;
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
        <Main>
          <Switch>
            <Route
              path="/create"
              render={props => (
                <CreatePage
                  onFormSubmit={handleFormSubmit}
                  history={props.history}
                />
              )}
            />
            <Route path="/" render={() => <NewsPage newsList={newsList} />} />
          </Switch>
        </Main>
        <Navigation>
          <NavButton to="/">
            <Icon icon="home" />
          </NavButton>
        </Navigation>
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;
