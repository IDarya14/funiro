import { useContext } from 'react';
import classes from '../styles/SignIn.module.scss';
import { useFormik } from 'formik';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../firebase/index';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { UIContext } from '../components/UIContext';

const initialValues = {
  email: '',
  password: '',
};

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Email is invalid').required('Required field'),
  password: Yup.string().required('Required field'),
});

const SignIn = () => {
  const router = useRouter();
  const { setAlert } = useContext(UIContext);

  const handleSignIn = () => {
    const auth = getAuth(app);
    signInWithEmailAndPassword(
      auth,
      formik.values.email,
      formik.values.password
    )
      .then((userCredential) => {
        const user = userCredential.user;
        router.push('/HomePage');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setAlert({
          show: true,
          severity: 'error',
          message: errorCode,
        });
      });
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSignIn,
    validationSchema: SignupSchema,
  });

  return (
    <div className={classes.signin}>
      <div className={classes.signin__image} />
      <div className={classes.signin__body}>
        <h1 className={classes.signin__title}>Login</h1>
        <div className={classes.signin__buttons}>
          <button
            className={`${classes.signin__button} ${classes.signin__button_active}`}
          >
            Login
          </button>
          <button
            className={classes.signin__button}
            onClick={() => router.push('/SignUp')}
          >
            Sign Up
          </button>
        </div>
        <form className={classes.signin__form} onSubmit={formik.handleSubmit}>
          <div className={classes.signin__item}>
            <input
              type="text"
              className={classes.signin__input}
              placeholder="E-mail"
              value={formik.values.email}
              onChange={formik.handleChange}
              name="email"
              error={formik.touched.email && !!formik.errors.email}
              onBlur={formik.handleBlur}
            />
            <div className={classes.signin__error}>{formik.errors.email}</div>
          </div>
          <div className={classes.signin__item}>
            <input
              type="password"
              className={classes.signin__input}
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              name="password"
              error={formik.touched.password && !!formik.errors.password}
              onBlur={formik.handleBlur}
            />
            <div className={classes.signin__error}>
              {formik.errors.password}
            </div>
          </div>

          <button type="submit" className={classes.signin__submit}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
