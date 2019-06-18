import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  setLocalData,
  getLocalData,
  createUserGroup,
  patchUserGroup
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
  const [currentUserGroup, setCurrentUserGroup] = useState(
    getLocalData('usergroup')
  );
  const [newsList, setNewsList] = useState(getLocalData('newsList'));
  const [toDos, setToDos] = useState(getLocalData('toDos'));
  const [user, setUser] = useState(getLocalData('user'));
  const [location, setLocation] = useState(getLocalData('location') || '');
  const [medicationList, setMedicationList] = useState(
    getLocalData('medicationList')
  );
  const [medicalComments, setMedicalComments] = useState(
    getLocalData('medicalComments')
  );
  const [isLoggedIn, setIsLoggedIn] = useState(
    getLocalData('isLoggedIn') || false
  );

  useEffect(() => {
    setLocalData('usergroup', currentUserGroup);
  }, [currentUserGroup]);

  useEffect(() => setLocalData('isLoggedIn', isLoggedIn), [isLoggedIn]);

  useEffect(() => setLocalData('user', user), [user]);

  useEffect(() => {
    setLocalData('newsList', newsList);
  }, [newsList]);

  useEffect(() => {
    setLocalData('toDos', toDos);
  }, [toDos]);

  useEffect(() => setLocalData('location', location), [location]);

  useEffect(() => setLocalData('medicationList', medicationList), [
    medicationList
  ]);

  useEffect(() => setLocalData('medicalComments', medicalComments), [
    medicalComments
  ]);

  async function handleNewUserGroup(newUserGroup) {
    const createdUserGroup = await createUserGroup(newUserGroup);
    setCurrentUserGroup(createdUserGroup);
  }

  function handleLogin(foundUser, foundUserGroup, history) {
    setUser(foundUser);
    setNewsList(foundUserGroup.newsList);
    setToDos(foundUserGroup.toDos);
    setCurrentUserGroup(foundUserGroup);
    setLocation(foundUserGroup.location);
    setMedicationList(foundUserGroup.medicationList);
    setMedicalComments(foundUserGroup.medicalComments);
    setIsLoggedIn(true);
    history.push('/news');
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setUser('');
    setCurrentUserGroup('');
    setNewsList('');
    setToDos('');
    setMedicalComments('');
    setMedicationList('');
    setLocation('');
  }
  async function handleNewData(target, newData, history) {
    const id = currentUserGroup._id;
    const changedUserGroup = {
      ...currentUserGroup,
      [target]: [newData, ...getObjectRest(target, currentUserGroup)]
    };
    const createdUserGroup = await patchUserGroup(changedUserGroup, id);
    setCurrentUserGroup(createdUserGroup);
    setState(target, createdUserGroup);
    history && history.push('/news');
  }

  async function handleDataDelete(target, deletedData) {
    const index = getStateName(target).findIndex(
      dataObj => dataObj.id === deletedData.id
    );
    const id = currentUserGroup._id;
    const changedUserGroup = {
      ...currentUserGroup,
      [target]: [
        ...getObjectRest(target, currentUserGroup).slice(0, index),
        ...getObjectRest(target, currentUserGroup).slice(index + 1)
      ]
    };
    const createdUserGroup = await patchUserGroup(changedUserGroup, id);
    setCurrentUserGroup(createdUserGroup);
    setState(target, createdUserGroup);
  }

  async function handleDataChange(target, changedData) {
    const index = getStateName(target).findIndex(
      dataObj => dataObj.id === changedData.id
    );
    const id = currentUserGroup._id;
    const changedUserGroup = {
      ...currentUserGroup,
      [target]: [
        ...getObjectRest(target, currentUserGroup).slice(0, index),
        changedData,
        ...getObjectRest(target, currentUserGroup).slice(index + 1)
      ]
    };
    const createdUserGroup = await patchUserGroup(changedUserGroup, id);
    setCurrentUserGroup(createdUserGroup);
    setState(target, createdUserGroup);
  }

  async function handleLocationChange(name, newLocation) {
    const id = currentUserGroup._id;
    const changedUserGroup = {
      ...currentUserGroup,
      location: { ...currentUserGroup.location, [name]: newLocation }
    };
    const createdUserGroup = await patchUserGroup(changedUserGroup, id);
    setCurrentUserGroup(createdUserGroup);
    setLocation(createdUserGroup.location);
  }

  function setState(target, createdUserGroup) {
    switch (target) {
      case 'newsList':
        return setNewsList(createdUserGroup.newsList);
      case 'toDos':
        return setToDos(createdUserGroup.toDos);
      case 'location':
        return setLocation(createdUserGroup.location);
      case 'medicationList':
        return setMedicationList(createdUserGroup.medicationList);
      case 'medicalComments':
        return setMedicalComments(createdUserGroup.medicalComments);
      default:
        return;
    }
  }

  function getStateName(target) {
    switch (target) {
      case 'newsList':
        return newsList;
      case 'toDos':
        return toDos;
      case 'location':
        return location;
      case 'medicationList':
        return medicationList;
      case 'medicalComments':
        return medicalComments;
      default:
        return;
    }
  }

  function getObjectRest(target, currentUserGroup) {
    switch (target) {
      case 'users':
        return currentUserGroup.users;
      case 'newsList':
        return currentUserGroup.newsList;
      case 'toDos':
        return currentUserGroup.toDos;
      case 'location':
        return currentUserGroup.location;
      case 'medicationList':
        return currentUserGroup.medicationList;
      case 'medicalComments':
        return currentUserGroup.medicalComments;
      default:
        return;
    }
  }

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
                    onNewData={handleNewData}
                    user={user}
                    history={props.history}
                  />
                )}
              />
              <Route
                path="/todo"
                render={() => (
                  <ToDoPage
                    toDos={toDos}
                    user={user}
                    onNewData={handleNewData}
                    onDataChange={handleDataChange}
                    onDataDelete={handleDataDelete}
                  />
                )}
              />
              <Route
                path="/user"
                render={props => (
                  <UserPage
                    onNewData={handleNewData}
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
                    onNewData={handleNewData}
                    onDataDelete={handleDataDelete}
                    onDataChange={handleDataChange}
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
                    onDataDelete={handleDataDelete}
                    newsList={newsList}
                    onDataChange={handleDataChange}
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
                  onNewData={handleNewData}
                  onLogin={handleLogin}
                  user={user}
                  currentUserGroup={currentUserGroup}
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
