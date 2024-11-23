import { useTranslation } from 'react-i18next';
import { UserModel } from '../core/_models';
import { useAuth } from '../core/Auth';
import { LanguageSupported, setLanguage } from '@/app/locales/LanguageHelper';

const Login = () => {
  const { saveAuth, setCurrentUser } = useAuth();
  const { t, i18n } = useTranslation();
  const changeLanguage = (lang: LanguageSupported) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
  };

  const handleSubmit = async () => {
    // const email: string = "a@gmail.com";
    // const password: string = "123456";
    try {
      // const { data: auth } = await login(email, password);
      const mockAuth = {
        api_token: '123456',
      };
      saveAuth(mockAuth);

      // const { data: user } = await getUserByToken(auth.api_token);

      const mockUser = {
        id: 1,
        firstname: 'abc',
      } as UserModel;
      setCurrentUser(mockUser);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <h2>{t('AUTH.LOGIN')}</h2>
        <input type="text" placeholder="name" />
        <input type="text" placeholder="password" />
      </form>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('vn')}>VietNam</button>
    </div>
  );
};

export default Login;
