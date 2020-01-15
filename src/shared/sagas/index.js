import { all } from 'redux-saga/effects';
import rootAuthSaga from 'screens/auth/saga';
import rootSemSessionSaga from 'screens/sem-session/saga';

export default function* rootSaga() {
  yield all([rootAuthSaga(), rootSemSessionSaga()]);
}
