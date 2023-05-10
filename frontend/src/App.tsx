import { useAppSelector } from './store/hooks';
import Main from './modules/main/main';
import Profile from './modules/main/profile/profile';
import Feed from './modules/main/feed/feed';
import Messenger from './modules/main/messenger/messenger';
import ErrorPage from './modules/error/error-page';
import Entry from './modules/entry/entry';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider
} from 'react-router-dom';
import './App.css';

function App() {
  const { loggedUserId } = useAppSelector((state) => state.auth);

  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <>
            <Route
              path="/entry"
              errorElement={<ErrorPage />}
              element={!loggedUserId ? <Entry /> : <Navigate to="/" />}
            />
            <Route path="/" element={loggedUserId ? <Main /> : <Navigate to="/entry" />}>
              <Route index element={<Profile />} />
              <Route path="messenger" element={<Messenger />} />
              <Route path="feed" element={<Feed />} />
            </Route>
          </>
        )
      )}
    />
  );
}
export default App;
