/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthModel } from "./_models";

const AUTH_LOCAL_STORAGE_KEY = "auth_local_storage_key";

const getAuth = (): AuthModel | undefined => {
  if (!localStorage) {
    return;
  }

  const ls_value: string | null = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY);
  if (!ls_value) {
    return;
  }

  try {
    const auth: AuthModel = JSON.parse(ls_value) as AuthModel;
    if (auth) {
      return auth;
    }
  } catch (error) {
    console.error("AUTH LOCAL STORAGE PARSE ERROR", error);
  }
};

const setAuth = (auth: AuthModel) => {
  if (!localStorage) {
    return;
  }

  try {
    const lsValue = JSON.stringify(auth);
    localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, lsValue);
  } catch (error) {
    console.error("AUTH LOCAL STORAGE SAVE ERROR", error);
  }
};

const removeAuth = () => {
  if (!localStorage) {
    return;
  }

  try {
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY);
  } catch (error) {
    console.error("AUTH LOCAL STORAGE REMOVE ERROR", error);
  }
};

export function setupAxios(axios: any) {
  axios.defaults.headers.Accept = "application/json";

  axios.interceptors.request.use(
    (config: { headers: { Authorization?: string } }) => {
      const auth = getAuth();
      if (auth && auth.api_token) {
        config.headers.Authorization = `Bearer ${auth.api_token}`;
      }
      return config;
    },
    (err: any) => Promise.reject(err)
  );
}

export { AUTH_LOCAL_STORAGE_KEY, getAuth, removeAuth, setAuth };
