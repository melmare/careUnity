import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  setLocalData,
  getLocalData,
  createUserGroup,
  patchUserGroup,
  getTotalUserGroups
} from '../services';
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
import UserPage from '../userpage/UserPage';
import MedicalPage from '../medicalpage/MedicalPage';
import LoginPage from '../loginpage/LoginPage';

library.add(faHome, faList, faUser, faFirstAid);

const AppContainer = styled.div`
  position: absolute;
  width: 100vw;
`;

function App() {
  const [toDos, setToDos] = useState(getLocalData('toDos') || []);
  const [user, setUser] = useState(getLocalData('user'));
  const [currentUserGroup, setCurrentUserGroup] = useState(
    getLocalData('usergroup')
  );
  const [newsList, setNewsList] = useState(getLocalData('news'));
  const [userGroups, setUserGroups] = useState([]);
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

  async function handleSaveNewEntry(newEntry, history) {
    const id = currentUserGroup._id;
    const changedUserGroup = {
      name: currentUserGroup.name,
      password: currentUserGroup.password,
      _id: currentUserGroup._id,
      users: currentUserGroup.users,
      news: [newEntry, ...currentUserGroup.news]
    };
    const createdUserGroup = await patchUserGroup(changedUserGroup, id);
    setCurrentUserGroup(createdUserGroup);
    setNewsList(changedUserGroup.news);
    history.push('/news');
  }

  async function handleNewsDelete(deletedEntry) {
    const index = newsList.findIndex(entry => entry.id === deletedEntry.id);
    const id = currentUserGroup._id;
    const changedUserGroup = {
      name: currentUserGroup.name,
      password: currentUserGroup.password,
      _id: currentUserGroup._id,
      users: currentUserGroup.users,
      news: [...newsList.slice(0, index), ...newsList.slice(index + 1)]
    };
    const createdUserGroup = await patchUserGroup(changedUserGroup, id);
    setCurrentUserGroup(createdUserGroup);
    setNewsList(changedUserGroup.news);
  }

  async function handleSaveChangedNewsEntry(changedEntry) {
    const index = newsList.findIndex(entry => entry.id === changedEntry.id);
    const id = currentUserGroup._id;
    const changedUserGroup = {
      name: currentUserGroup.name,
      password: currentUserGroup.password,
      _id: currentUserGroup._id,
      users: currentUserGroup.users,
      news: [
        ...newsList.slice(0, index),
        changedEntry,
        ...newsList.slice(index + 1)
      ]
    };
    const createdUserGroup = await patchUserGroup(changedUserGroup, id);
    setCurrentUserGroup(createdUserGroup);
    setNewsList(changedUserGroup.news);
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

  async function handleNewUserGroup(newUserGroup) {
    const createdUserGroup = await createUserGroup(newUserGroup);
    setCurrentUserGroup(createdUserGroup);
  }

  async function handleNewUserRegistration(newUser) {
    const id = currentUserGroup._id;
    const changedUserGroup = {
      name: currentUserGroup.name,
      password: currentUserGroup.password,
      _id: currentUserGroup._id,
      users: [...currentUserGroup.users, newUser],
      news: [...currentUserGroup.news]
    };
    const createdUserGroup = await patchUserGroup(changedUserGroup, id);
    setCurrentUserGroup(createdUserGroup);
  }

  function handleLogin(foundUser, foundUserGroup, history) {
    setUser(foundUser);
    setNewsList(foundUserGroup.news);
    setCurrentUserGroup(foundUserGroup);
    setIsLoggedIn(true);
    history.push('/news');
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setUser('');
    setCurrentUserGroup('');
  }
  useEffect(() => {
    setLocalData('usergroup', currentUserGroup);
  }, [currentUserGroup]);

  useEffect(() => setLocalData('isLoggedIn', isLoggedIn), [isLoggedIn]);

  /*useEffect(() => {
    async function fetchUserGroups() {
      await getTotalUserGroups().then(data => setUserGroups(data));
    }
    fetchUserGroups();
  }, []);*/

  useEffect(() => setLocalData('user', user), [user]);
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
                    currentUserGroup={currentUserGroup}
                    onNewsDelete={handleNewsDelete}
                    newsList={newsList}
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
                  onNewUserRegistration={handleNewUserRegistration}
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
