import InputGroup from "../../components/InputGroup/InputGroup";
import { useFormik } from "formik";
import { registerSchema } from '../../utils/yup.schemas';
import { register } from '../../services/AuthService';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

const initialValues = {
  name: "",
  email: "",
  password: "",
  phoneNumber: "",
  city: "",
};

const Register = () => {
  const { user } = useAuthContext();
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
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: registerSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('password', values.password);
      formData.append('phoneNumber', values.phoneNumber);
      formData.append('city', values.city);

      if (values.profilePicture) {
        console.log('values.profilePicture: ', values.profilePicture);
        formData.append('profilePicture', values.profilePicture);
      }

      register(formData)
        .then(() => {
          navigate("/login");
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
    <div className="d-flex justify-content-center text-center p-2">
      <div className="bg-white box-shadow border boder-rounded d-flex flex-column p-4 mt-4">
       <h1>Register</h1>
      <form onSubmit={handleSubmit} className="mb-3">
        <InputGroup
          label="Name"
          name="name"
          type="text"
          value={values.name}
          error={touched.name && errors.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your name"
        />
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
           <InputGroup
          label="Phone Number"
          name="phoneNumber"
          type="number"
          value={values.phoneNumber}
          error={touched.phoneNumber && errors.phoneNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your phone number"
        />
             <InputGroup
          label="City"
          name="city"
          type="text"
          value={values.city}
          error={touched.city && errors.city}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your city"
        />
        <InputGroup
          label="Profile picture"
          name="profilePicture"
          type="file"
          onChange={(event) => {
            setFieldValue("profilePicture", event.currentTarget.files[0]);
          }}
          placeholder="Upload your profile picture"
        />

        <button type="submit" className={`btn btn-outline-${isSubmitting ? 'secondary' : 'info'}`}>
          {isSubmitting ? "Submitting..." : "Register"}
        </button>
      </form>
      </div>
    </div>
  );
}

export default Register;