import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import { useDispatch } from "react-redux";
import { firebaseAuth } from "services/firebase";
import PublicRouter from "./PublicRouter";
import PrivateRouter from "./PrivateRouter";
import { useAppSelector } from "redux/hooks";
import { setUser, stopLoading } from "redux/reducers/auth.reducer";
import Loader from "components/Loader";

export default function Routes() {
  const dispatch = useDispatch();
  const auth = useAppSelector((state) => state.auth);
  React.useEffect(() => {
    if (!auth.user) {
      const unsubscribe = onAuthStateChanged(
        firebaseAuth,
        async (currentUser) => {
          if (currentUser) {
            const userObj = {
              displayName: currentUser.displayName || "",
              email: currentUser.email || "",
              photoURL: currentUser.photoURL || "",
              uid: currentUser.uid,
              emailVerified: currentUser.emailVerified,
              isAnonymous: currentUser.isAnonymous,
              phoneNumber: currentUser.phoneNumber || "",
              providerData: currentUser.providerData,
              accessToken: await currentUser.getIdToken(),
            };
            localStorage.setItem("accessToken", userObj.accessToken);
            dispatch(setUser(userObj));
          }
          dispatch(stopLoading());
        }
      );
      return () => unsubscribe();
    }
  }, [auth.user, dispatch]);

  return (
    <div>
      {/* <PrivateRouter /> */}
      {auth.loading && <Loader loading />}
      {auth.user && !auth.loading && <PrivateRouter />}
      {!auth.user && !auth.loading && <PublicRouter />}
    </div>
  );
}
