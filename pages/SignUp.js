import { useContext } from 'react';
import classes from '../styles/SignIn.module.scss';
import { useFormik } from 'formik';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import app from '../firebase/index';
import { getFirestore } from 'firebase/firestore';
import { collection, addDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { UIContext } from '../components/UIContext';

const initialValues = {
  email: '',
  password: '',
  repeatPassword: '',
  fullName: '',
};

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Email is invalid').required('Required field'),
  password: Yup.string().required('Required field'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Password must be the same')
    .required('Required field'),
  fullName: Yup.string()
    .matches(/[A-Z][a-z]+(\s|,)[A-Z][a-z]/, 'Please enter valid name')
    .required('Required field'),
});

const SignUp = () => {
  const router = useRouter();
  const { setAlert } = useContext(UIContext);
  const db = getFirestore(app);

  const handleSignIn = () => {
    const auth = getAuth(app);
    createUserWithEmailAndPassword(
      auth,
      formik.values.email,
      formik.values.password
    )
      .then((userCredential) => {
        const user = userCredential.user;
        const docRef = user.email;
        docRef = addDoc(collection(db, 'users'), {
          email: formik.values.email,
          password: formik.values.password,
          fullName: formik.values.fullName,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setAlert({
          show: true,
          severity: 'error',
          message: errorCode,
        });
        // ..
      })
      .finally(() => formik.setSubmitting(false));
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
        <h1 className={classes.signin__title}>Register</h1>
        <div className={classes.signin__buttons}>
          <button
            className={classes.signin__button}
            onClick={() => router.push('/SignIn')}
          >
            Login
          </button>
          <button
            className={`${classes.signin__button} ${classes.signin__button_active}`}
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
              type="text"
              className={classes.signin__input}
              placeholder="Full name"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              name="fullName"
              error={formik.touched.fullName && !!formik.errors.fullName}
              onBlur={formik.handleBlur}
            />
            <div className={classes.signin__error}>
              {formik.errors.fullName}
            </div>
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
          <div className={classes.signin__item}>
            <input
              type="password"
              className={classes.signin__input}
              placeholder="Repeat password"
              value={formik.values.repeatPassword}
              onChange={formik.handleChange}
              name="repeatPassword"
              error={
                formik.touched.repeatPassword && !!formik.errors.repeatPassword
              }
              onBlur={formik.handleBlur}
            />
            <div className={classes.signin__error}>
              {formik.errors.repeatPassword}
            </div>
          </div>

          <button
            type="submit"
            className={classes.signin__submit}
            disabled={formik.isSubmitting}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
