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

  // NEWSPAGE

  async function handleSaveNewEntry(newEntry, history) {
    const id = currentUserGroup._id;
    const changedUserGroup = {
      name: currentUserGroup.name,
      password: currentUserGroup.password,
      _id: currentUserGroup._id,
      users: currentUserGroup.users,
      news: [newEntry, ...currentUserGroup.news],
      toDos: currentUserGroup.toDos,
      location: currentUserGroup.location,
      medicationList: currentUserGroup.medicationList,
      medicalComments: currentUserGroup.medicalComments
    };
    const createdUserGroup = await patchUserGroup(changedUserGroup, id);
    setCurrentUserGroup(createdUserGroup);
    setNewsList(createdUserGroup.news);
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
      news: [...newsList.slice(0, index), ...newsList.slice(index + 1)],
      toDos: currentUserGroup.toDos,
      location: currentUserGroup.location,
      medicationList: currentUserGroup.medicationList,
      medicalComments: currentUserGroup.medicalComments
    };
    const createdUserGroup = await patchUserGroup(changedUserGroup, id);
    setCurrentUserGroup(createdUserGroup);
    setNewsList(createdUserGroup.news);
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
      ],
      toDos: currentUserGroup.toDos,
      location: currentUserGroup.location,
      medicationList: currentUserGroup.medicationList,
      medicalComments: currentUserGroup.medicalComments
    };
    const createdUserGroup = await patchUserGroup(changedUserGroup, id);
    setCurrentUserGroup(createdUserGroup);
    setNewsList(createdUserGroup.news);
  }

  useEffect(() => {
    setLocalData('newsList', newsList);
  }, [newsList]);

  // TODOPAGE

  async function handleToDoSubmit(newToDo) {
    const id = currentUserGroup._id;
    const changedUserGroup = {
      name: currentUserGroup.name,
      password: currentUserGroup.password,
      _id: currentUserGroup._id,
      users: currentUserGroup.users,
      news: currentUserGroup.news,
      toDos: [newToDo, ...currentUserGroup.toDos],
      location: currentUserGroup.location,
      medicationList: currentUserGroup.medicationList,
      medicalComments: currentUserGroup.medicalComments
    };
    const createdUserGroup = await patchUserGroup(changedUserGroup, id);
    setCurrentUserGroup(createdUserGroup);
    setToDos(changedUserGroup.toDos);
  }

  async function handleToDoChange(changedToDo) {
    const index = toDos.findIndex(toDo => toDo.id === changedToDo.id);
    const id = currentUserGroup._id;
    const changedUserGroup = {
      name: currentUserGroup.name,
      password: currentUserGroup.password,
      _id: currentUserGroup._id,
      users: currentUserGroup.users,
      news: currentUserGroup.news,
      toDos: [...toDos.slice(0, index), changedToDo, ...toDos.slice(index + 1)],
      location: currentUserGroup.location,
      medicationList: currentUserGroup.medicationList,
      medicalComments: currentUserGroup.medicalComments
    };
    const createdUserGroup = await patchUserGroup(changedUserGroup, id);
    setCurrentUserGroup(createdUserGroup);
    setToDos(createdUserGroup.toDos);
  }

  async function handleToDoDelete(deletedToDo) {
    const index = toDos.findIndex(toDo => toDo.id === deletedToDo.id);
    const id = currentUserGroup._id;
    const changedUserGroup = {
      name: currentUserGroup.name,
      password: currentUserGroup.password,
      _id: currentUserGroup._id,
      users: currentUserGroup.users,
      news: currentUserGroup.news,
      toDos: [...toDos.slice(0, index), ...toDos.slice(index + 1)],
      location: currentUserGroup.location,
      medicationList: currentUserGroup.medicationList,
      medicalComments: currentUserGroup.medicalComments
    };
    const createdUserGroup = await patchUserGroup(changedUserGroup, id);
    setCurrentUserGroup(createdUserGroup);
    setToDos(createdUserGroup.toDos);
  }

  useEffect(() => {
    setLocalData('toDos', toDos);
  }, [toDos]);
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
      news: currentUserGroup.news,
      toDos: currentUserGroup.toDos,
      location: currentUserGroup.location,
      medicationList: currentUserGroup.medicationList,
      medicalComments: currentUserGroup.medicalComments
    };
    const createdUserGroup = await patchUserGroup(changedUserGroup, id);
    setCurrentUserGroup(createdUserGroup);
  }

  function handleLogin(foundUser, foundUserGroup, history) {
    setUser(foundUser);
    setNewsList(foundUserGroup.news);
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
  useEffect(() => {
    setLocalData('usergroup', currentUserGroup);
  }, [currentUserGroup]);

  useEffect(() => setLocalData('isLoggedIn', isLoggedIn), [isLoggedIn]);

  useEffect(() => setLocalData('user', user), [user]);
  // MEDICALPAGE

  async function handleLocationChange(name, newLocation) {
    const id = currentUserGroup._id;
    const changedUserGroup = {
      name: currentUserGroup.name,
      password: currentUserGroup.password,
      _id: currentUserGroup._id,
      users: currentUserGroup.users,
      news: currentUserGroup.news,
      toDos: currentUserGroup.toDos,
      location: { ...currentUserGroup.location, [name]: newLocation },
      medicationList: currentUserGroup.medicationList,
      medicalComments: currentUserGroup.medicalComments
    };
    const createdUserGroup = await patchUserGroup(changedUserGroup, id);
    setCurrentUserGroup(createdUserGroup);
    setLocation(createdUserGroup.location);
  }

  useEffect(() => setLocalData('location', location), [location]);

  async function handleSingleMedicationSubmit(newSingleMedication) {
    const id = currentUserGroup._id;
    const changedUserGroup = {
      name: currentUserGroup.name,
      password: currentUserGroup.password,
      _id: currentUserGroup._id,
      users: currentUserGroup.users,
      news: currentUserGroup.news,
      toDos: currentUserGroup.toDos,
      location: currentUserGroup.location,
      medicationList: [...medicationList, newSingleMedication],
      medicalComments: currentUserGroup.medicalComments
    };
    const createdUserGroup = await patchUserGroup(changedUserGroup, id);
    setCurrentUserGroup(createdUserGroup);
    setMedicationList(createdUserGroup.medicationList);
  }

  useEffect(() => setLocalData('medicationList', medicationList), [
    medicationList
  ]);

  async function handleSingleMedicationDelete(deletedSingleMedication) {
    const index = medicationList.findIndex(
      medication => medication.id === deletedSingleMedication.id
    );
    const id = currentUserGroup._id;
    const changedUserGroup = {
      name: currentUserGroup.name,
      password: currentUserGroup.password,
      _id: currentUserGroup._id,
      users: currentUserGroup.users,
      news: currentUserGroup.news,
      toDos: currentUserGroup.toDos,
      location: currentUserGroup.location,
      medicationList: [
        ...medicationList.slice(0, index),
        ...medicationList.slice(index + 1)
      ],
      medicalComments: currentUserGroup.medicalComments
    };
    const createdUserGroup = await patchUserGroup(changedUserGroup, id);
    setCurrentUserGroup(createdUserGroup);
    setMedicationList(createdUserGroup.medicationList);
  }

  async function handleSingleMedicationChange(changedSingleMedication) {
    const index = medicationList.findIndex(
      medication => medication.id === changedSingleMedication.id
    );
    const id = currentUserGroup._id;
    const changedUserGroup = {
      name: currentUserGroup.name,
      password: currentUserGroup.password,
      _id: currentUserGroup._id,
      users: currentUserGroup.users,
      news: currentUserGroup.news,
      toDos: currentUserGroup.toDos,
      location: currentUserGroup.location,
      medicationList: [
        ...medicationList.slice(0, index),
        changedSingleMedication,
        ...medicationList.slice(index + 1)
      ],
      medicalComments: currentUserGroup.medicalComments
    };
    const createdUserGroup = await patchUserGroup(changedUserGroup, id);
    setCurrentUserGroup(createdUserGroup);
    setMedicationList(createdUserGroup.medicationList);
  }

  async function handleMedicalCommentSubmit(newMedicalComment) {
    const id = currentUserGroup._id;
    const changedUserGroup = {
      name: currentUserGroup.name,
      password: currentUserGroup.password,
      _id: currentUserGroup._id,
      users: currentUserGroup.users,
      news: currentUserGroup.news,
      toDos: currentUserGroup.toDos,
      location: currentUserGroup.location,
      medicationList: currentUserGroup.medicationList,
      medicalComments: [newMedicalComment, ...medicalComments]
    };
    const createdUserGroup = await patchUserGroup(changedUserGroup, id);
    setCurrentUserGroup(createdUserGroup);
    setMedicalComments(createdUserGroup.medicalComments);
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
                    onToDoChange={handleToDoChange}
                    onToDoDelete={handleToDoDelete}
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
