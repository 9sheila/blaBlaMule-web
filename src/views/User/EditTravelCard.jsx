import { useState, useEffect } from "react";
import { editTravel, getTravel } from "../../services/TravelsService";
import InputGroup from "../../components/InputGroup/InputGroup";
import { useFormik } from "formik";
import { editTravelSchema } from "../../utils/yup.schemas";
import { useNavigate } from "react-router-dom";

const EditTravelCard = () => {
    const [travelData, setTravelData] = useState({
        date: travel.date,
        startingPoint: travel.startingPoint,
        destination: travel.destination,
        weight: travel.weight,
        price: travel.price,
    });

    const navigate = useNavigate();

    const initialValues = {
        date: travel.date,
        startingPoint: travel.startingPoint,
        destination: travel.destination,
        weight: travel.weight,
        price: travel.price,
    }

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
        validationSchema: editTravelSchema,
        onSubmit: (values) => {
            const formData = new FormData();
            formData.append('date', values.date);
            formData.append('startingPoint', values.startingPoint);
            formData.append('destination', values.destination);
            formData.append('weight', values.weight);
            formData.append('price', values.price);
            


            editTravel(formData)
                .then(() => {
                    console.log('edited');
                    console.log(`travelData ---> ${travelData}`);
                    console.log(`travel ---> ${travel}`);
                    getTravel(() => (navigate('/profile')));
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
        <div className="edit-travelcard-margin">
            <div className="EditTravel edit-travel d-flex flex-column align-items-center container mt-4">
                <div className="edit-travel-title">
                    <h1>Editar viaje</h1>
                    <hr />
                </div>
                <form className="edit-travelcard-form" onSubmit={handleSubmit} >
                    <InputGroup
                        label={
                            <>
                                <i className="bi bi-date-fill"></i> Fecha
                            </>
                        }
                        name="date"
                        type="date"
                        value={values.date}
                        error={touched.date && errors.date}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="dd/mm/aaaa"
                    />
                 
                    <InputGroup
                        label={
                            <>
                                <i className="bi bi-startingPoint-fill"></i>Punto de partida
                            </>
                        }
                        name="startingPoint"
                        type="text"
                        value={values.startingPoint}
                        error={touched.startingPoint && errors.startingPoint}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Ciudad"
                    />
                    <InputGroup
                        label={
                            <>
                                <i className="bi bi-destination-alt-fill"></i> Destino
                            </>
                        }
                        name="destination"
                        type="text"
                        value={values.destination}
                        error={touched.destination && errors.destination}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="destino"
                    />
                    <div className="submit-button mt-4 d-flex justify-content-center align-items-center">
                        <button type="submit" className={`btn ${isSubmitting ? 'submitting' : ''}`}>
                            {isSubmitting ? "Cargando" : "Editar viaje"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditTravelCard;