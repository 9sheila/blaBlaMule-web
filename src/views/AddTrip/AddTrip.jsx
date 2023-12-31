import { useFormik } from "formik";
import InputGroup from "../../components/InputGroup/InputGroup";
import { addTrip } from '../../services/TravelsService';
import { useNavigate, Navigate } from 'react-router-dom';
import { travelSchema } from "../../utils/yup.schemas";


const initialValues = {
    weight:"",
    date: "",
    pickUpPoint:"",
    startingPoint: "",
    destination: "",
   
};

const AddTrip = () => {
    const navigate = useNavigate();

    const {
        values,
        errors,
        touched,
        handleChange,
        isSubmitting,
        handleSubmit,
        setSubmitting,
        setFieldError,
        setFieldValue,
    } = useFormik({
        initialValues: initialValues,
        validateOnBlur: true,
        validateOnChange: false,
        validationSchema: travelSchema,
        onSubmit: (values) => {
            addTrip(values)
                .then(() => {
                    navigate("/profile");
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    setSubmitting(false);
                });
        },
    });

    return (
    <div className="AddTrip">
        

        <div className="d-flex justify-content-center text-center p-2">
        <div className="bg-white box-shadow border boder-rounded d-flex flex-column p-4 mt-4">
        <h1>Add Trip</h1>
        <form onSubmit={handleSubmit}>
                <InputGroup
                label="date"
                name="date"
                type="date"
                value={values.date}
                error={touched.date && errors.date}
                onChange={handleChange}
                placeholder="Enter the date"
            />
            <div className="row">
                <div className="col">
            <InputGroup
                label="weight"
                name="weight"
                type="number"
                value={values.weight}
                error={touched.weight && errors.weight}
                onChange={handleChange}
                placeholder="Enter the amount of weight available"
            />
            </div>
            <div className="col">
             <InputGroup
                label="price"
                name="price"
                type="number"
                value={values.price}
                error={touched.price && errors.price}
                onChange={handleChange}
                placeholder="Enter the price"
            />
            </div>
            </div>
            <InputGroup
                label="pick up point"
                name="pickUpPoint"
                type="text"
                value={values.pickUpPoint}
                error={touched.pickUpPoint && errors.pickUpPoint}
                onChange={handleChange}
                placeholder="Enter the pick up point"
            />
            <InputGroup
                label="starting point"
                name="startingPoint"
                type="text"
                value={values.startingPoint}
                error={touched.startingPoint && errors.startingPoint}
                onChange={handleChange}
                placeholder="Enter the starting point"
            />
            <InputGroup
                label="destination"
                name="destination"
                type="text"
                value={values.destination}
                error={touched.destination && errors.destination}
                onChange={handleChange}
                placeholder="Enter your destination"
            />
            <InputGroup
                label="description"
                name="description"
                type="text"
                onChange={handleChange}
                placeholder="Enter a description"
            />

            <button type="submit" className={`btn btn-${isSubmitting ? 'secondary' : 'primary'}`}>
                {isSubmitting ? "Submitting..." : "Add Trip"}
            </button>
        </form>
        </div>
    </div>
    </div>
    );
}

export default AddTrip;