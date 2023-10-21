import React, { useState } from "react";
import InputGroup from "../../components/InputGroup/InputGroup";
import { editTravel } from "../../services/TravelsService";
import { useFormik } from "formik";
import { editTravelSchema } from "../../utils/yup.schemas";
import { useNavigate } from "react-router-dom";

const EditTravelCard = () => {
  const navigate = useNavigate();

  // Valores iniciales para el formulario
  const initialValues = {
    date: "",
    startingPoint: "",
    destination: "",
    weight: "",
    price: "",
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    isSubmitting,
    setSubmitting,
    handleSubmit,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: editTravelSchema, // Utilizamos el esquema de validación
    onSubmit: (values) => {
      editTravel(values)
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
    <div className="d-flex justify-content-center text-center p-2">
      <div className="bg-white box-shadow border boder-rounded d-flex flex-column p-4 mt-4">
        <div className="edit-travel-title">
          <h1>Editar viaje</h1>
          <hr />
        </div>
        <form className="edit-travelcard-form" onSubmit={handleSubmit}>
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
<div className="row">
    <div className="col">
          <InputGroup
            label={
              <>
                <i className="bi bi-startingPoint-fill"></i> Punto de partida
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
          </div>
          <div className="col">
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
            placeholder="Destino"
          />
          </div>
          </div>
          <InputGroup
            label={
              <>
                <i className="bi bi-weight-fill"></i> Peso
              </>
            }
            name="weight"
            type="text"
            value={values.weight}
            error={touched.weight && errors.weight}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Peso"
          />
          <InputGroup
            label={
              <>
                <i className="bi bi-cash-stack"></i> Precio
              </>
            }
            name="price"
            type="text"
            value={values.price}
            error={touched.price && errors.price}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Precio"
          />
          <div className="submit-button mt-4 d-flex justify-content-center align-items-center">
            <button type="submit" className={`btn ${isSubmitting ? 'submitting' : ''}`}>
              {isSubmitting ? "Cargando" : "Editar viaje"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTravelCard;
