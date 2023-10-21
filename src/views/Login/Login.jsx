import InputGroup from '../../components/InputGroup/InputGroup';
import { useFormik } from 'formik';
import { loginSchema } from '../../utils/yup.schemas';
import { login as loginRequest } from '../../services/AuthService';
import { useNavigate, Navigate, NavLink } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext';
import './Login.css'

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const { login, user } = useAuthContext();
  const navigate = useNavigate();

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    isSubmitting,
    handleSubmit,
    setSubmitting,
    setFieldError,
  } = useFormik({
    initialValues: initialValues,
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      loginRequest(values)
        .then((res) => {
          console.log(res);
          login(res.accessToken, () => navigate('/profile'));
        })
        .catch((err) => {
          console.log(err);
          setFieldError('email', err.response.data.message);
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  return user ? (
    <Navigate to="/profile" />
  ) : (
    <div className="Login" >
      <div className="bg-white box-shadow border boder-rounded p-4 mt-4">
        <form onSubmit={handleSubmit} >

          <h2>Sign in</h2>
          <hr />
          <div className="Form">
          <InputGroup
            label="Email"
            name="email"
            type="email"
            value={values.email}
            error={touched.email && errors.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your email"
          />
          <InputGroup
            label="Password"
            name="password"
            type="password"
            value={values.password}
            error={touched.password && errors.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your password"
          />

          <button type="submit" className={`btn btn-outline-${isSubmitting ? 'secondary' : 'info'}`}>
            {isSubmitting ? "Submitting..." : "Login"}
          </button>
          <hr />
          <p>Don't you have an account? Create one</p>
          <NavLink to="/register"><button className="btn btn-outline-dark">register</button></NavLink>
          </div>
        </form>

      </div>
    </div>
  );
}

export default Login;