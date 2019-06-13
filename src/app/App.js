import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { setLocalData, getLocalData } from '../services';
import styled from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faHome,
  faList,
  faUser,
  faFirstAid
} from '@fortawesome/free-solid-svg-icons';
import GlobalStyles from '../components/GlobalStyles';
import Navigation from '../components/Navigation';
import CreatePage from '../createpage/CreatePage';
import ToDoPage from '../todopage/ToDoPage';
import NewsPage from '../newspage/NewsPage';
import NavButton from '../components/NavButton';
import Icon from '../components/NavIcon';
import UserPage from '../userpage/UserPage';
import MedicalPage from '../medicalpage/MedicalPage';
import LoginPage from '../loginpage/LoginPage';

library.add(faHome, faList, faUser, faFirstAid);

const AppContainer = styled.div`
  position: absolute;
  width: 100vw;
`;

function App() {
  const [newsList, setNewsList] = useState(getLocalData('news') || []);
  const [toDos, setToDos] = useState(getLocalData('toDos') || []);
  const [user, setUser] = useState(getLocalData('user'));
  const [currentUserGroup, setCurrentUserGroup] = useState(
    getLocalData('currentUserGroup')
  );
  const [userGroups, setUserGroups] = useState(
    getLocalData('userGroups') || []
  );
  const [isLoggedIn, setIsLoggedIn] = useState(
    getLocalData('isLoggedIn') || false
  );
  const [location, setLocation] = useState(getLocalData('location') || {});
  const [medicationList, setMedicationList] = useState(
    getLocalData('medicationList') || []
  );
  const [medicalComments, setMedicalComments] = useState(
    getLocalData('medicalComments') || []
  );

  // NEWSPAGE

  function handleSaveNewEntry(newEntry, history) {
    setNewsList([newEntry, ...newsList]);
    history.push('/news');
  }

  function handleNewsDelete(deletedEntry) {
    const index = newsList.findIndex(entry => entry.id === deletedEntry.id);
    setNewsList([...newsList.slice(0, index), ...newsList.slice(index + 1)]);
  }

  function handleSaveChangedNewsEntry(changedEntry) {
    const index = newsList.findIndex(entry => entry.id === changedEntry.id);
    setNewsList([
      ...newsList.slice(0, index),
      changedEntry,
      ...newsList.slice(index + 1)
    ]);
  }
  useEffect(() => {
    setLocalData('news', newsList);
  }, [newsList]);

  // TODOPAGE

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

  // USER/LOGIN PAGE

  function handleNewUserGroup(newUserGroup) {
    setCurrentUserGroup(newUserGroup);
    setUserGroups([...userGroups, newUserGroup]);
  }

  function handleNewUserRegistration(newUser) {
    const changedUserGroup = {
      name: currentUserGroup.name,
      password: currentUserGroup.password,
      id: currentUserGroup.id,
      users: [...currentUserGroup.users, newUser]
    };
    const index = userGroups.findIndex(
      userGroup => userGroup.id === changedUserGroup.id
    );
    setCurrentUserGroup(changedUserGroup);
    setUserGroups([
      ...userGroups.slice(0, index),
      changedUserGroup,
      ...userGroups.slice(index + 1)
    ]);
  }

  function handleLogin(foundUser, foundUserGroup, history) {
    setIsLoggedIn(true);
    setUser(foundUser);
    setCurrentUserGroup(foundUserGroup);
    history.push('/news');
  }
  function handleLogout() {
    setIsLoggedIn(false);
    setUser('');
    setCurrentUserGroup('');
  }

  useEffect(() => setLocalData('isLoggedIn', isLoggedIn), [isLoggedIn]);

  useEffect(() => setLocalData('user', user), [user]);

  useEffect(() => setLocalData('currentUserGroup', currentUserGroup), [
    currentUserGroup
  ]);

  useEffect(() => setLocalData('userGroups', userGroups), [userGroups]);

  // MEDICALPAGE

  function handleLocationChange(newAdress) {
    setLocation(newAdress);
  }

  useEffect(() => setLocalData('location', location), [location]);

  function handleSingleMedicationSubmit(newSingleMedication) {
    setMedicationList([...medicationList, newSingleMedication]);
    console.log(newSingleMedication);
  }
  useEffect(() => setLocalData('medicationList', medicationList), [
    medicationList
  ]);

  function handleSingleMedicationDelete(deletedSingleMedication) {
    const index = medicationList.findIndex(
      singleMedication => singleMedication.id === deletedSingleMedication.id
    );
    setMedicationList([
      ...medicationList.slice(0, index),
      ...medicationList.slice(index + 1)
    ]);
  }

  function handleSingleMedicationChange(changedSingleMedication) {
    const index = medicationList.findIndex(
      singleMedication => singleMedication.id === changedSingleMedication.id
    );
    setMedicationList([
      ...medicationList.slice(0, index),
      changedSingleMedication,
      ...medicationList.slice(index + 1)
    ]);
  }

  function handleMedicalCommentSubmit(newMedicalComment) {
    setMedicalComments([newMedicalComment, ...medicalComments]);
  }

  useEffect(() => setLocalData('medicalComments', medicalComments), [
    medicalComments
  ]);

  return (
    <BrowserRouter>
      <GlobalStyles />

      <AppContainer>
        <Switch>
          {isLoggedIn ? (
            <>
              <Route
                path="/create"
                render={props => (
                  <CreatePage
                    user={user}
                    onSaveNewEntry={handleSaveNewEntry}
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
                render={props => (
                  <UserPage
                    onNewUserRegistration={handleNewUserRegistration}
                    onLogout={handleLogout}
                    currentUserGroup={currentUserGroup}
                    user={user}
                    toDos={toDos}
                    newsList={newsList}
                    history={props.history}
                  />
                )}
              />
              <Route
                path="/info"
                render={() => (
                  <MedicalPage
                    location={location}
                    onLocationChange={handleLocationChange}
                    medicationList={medicationList}
                    onSingleMedicationSubmit={handleSingleMedicationSubmit}
                    onSingleMedicationDelete={handleSingleMedicationDelete}
                    onSingleMedicationChange={handleSingleMedicationChange}
                    onMedicalCommentSubmit={handleMedicalCommentSubmit}
                    medicalComments={medicalComments}
                  />
                )}
              />
              <Route
                activeClassName="active"
                path="/news"
                render={() => (
                  <NewsPage
                    user={user}
                    newsList={newsList}
                    onNewsDelete={handleNewsDelete}
                    onSaveChangedNewsEntry={handleSaveChangedNewsEntry}
                  />
                )}
              />
            </>
          ) : (
            <Route
              path="/"
              render={props => (
                <LoginPage
                  onNewUserGroup={handleNewUserGroup}
                  onLogin={handleLogin}
                  user={user}
                  currentUserGroup={currentUserGroup}
                  userGroups={userGroups}
                  history={props.history}
                />
              )}
            />
          )}
        </Switch>
        {isLoggedIn && <Navigation />}
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;
