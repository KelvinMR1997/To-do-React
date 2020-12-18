import React, { useState, useEffect } from "react";

// Se le pasan las propiedades como parametro, pero también puede hacerse de la siguiente forma:
// const Caja_principal = (props) => { const {tarea,setTarea} = props;
const Caja_principal = () => {
  const [tarea, setTarea] = useState("");
  const [error, setError] = useState(false);
  const [tareas, setTareas] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [tareaEditada, setTareaEditada] = useState({});
  // const [editID, setEditId] = useState();
  // backend
  // Función para guardar tarea (Esta puede ser simplificada con: tarea => setTarea(tarea.target.value))

  const eliminarTarea = (id) => {
    // console.log(`Eliminando la tarea # ${id
    const newtareas = tareas.filter((tarea, k) => k !== id);
    // console.log(newtareas);
    setTareas(newtareas);
    localStorage.setItem("Tareas", JSON.stringify(newtareas));
    // localStorage.removeItem();
  };

  const editarTarea = (id, text) => {
    setIsEditing(true);
    setTareaEditada({ id: id, tarea: text });
  };

  const guardarNuevaTarea = (e) => {
    e.preventDefault();
    // console.log("Guardando nueva tarea");
    const update = tareas.map((tarea, k) => {
      console.log(tarea);
      if (k === tareaEditada.id) {
        return tareaEditada.tarea;
      }
      return tarea;
    });
    setTareas(update);
    setIsEditing(false);
    localStorage.setItem("Tareas", JSON.stringify(update));
  };

  const leerTarea = (e) => {
    e.preventDefault();

    if (isEditing) {
      setTareaEditada({ ...tareaEditada, tarea: e.target.value });
      return;
    }
    setTarea(e.target.value);
  };
  // Función para guardar tarea
  const guardarTarea = (e) => {
    e.preventDefault();
    if (tarea === "") {
      setError(true);
      return;
    }
    // setTareas ([...20Tareas antiguas, + una tarea nueva])
    const newtareas = [tarea, ...tareas];
    setTareas(newtareas);
    localStorage.setItem("Tareas", JSON.stringify(newtareas));
    // Eliminar el error previo
    setError(false);
  };
  // LLamar los datos del localStorage
  useEffect(() => {
    let verTareas = localStorage.getItem("Tareas");
    if (verTareas !== null) {
      setTareas(JSON.parse(verTareas));
    }
  }, []);
  // console.log(tareas);
  return (
    <form id="msform" onSubmit={isEditing ? guardarNuevaTarea : guardarTarea}>
      <fieldset>
        <small className="pb-3">Dev: Kelvin Martinez</small>
        <hr />
        <input
          value={isEditing ? tareaEditada.tarea : tarea}
          type="text"
          name="Nueva tarea"
          placeholder="Nueva tarea"
          onChange={leerTarea}
        />
        <small>¿Tienes cosas por hacer ? 🤔🤔</small>
        <hr />
        <button type="submit" className="btn-primary btn btn-sm mb-4">
          {isEditing ? "Editar" : "Agregar"}
        </button>

        {error ? (
          <p className="alert alert-danger mt-3">
            Todos los campos son obligatorios
          </p>
        ) : null}
        {tareas.map((tarea, i) => (
          <div className="border-top border-bottom">
            <li id="txteditar" key={i} className="separacion card-text">
              {tarea}{" "}
              <div className="left-items">
                <a
                  style={{ color: "blue" }}
                  onClick={() => editarTarea(i, tarea)}
                  className="far fa-edit pr-3 pointer"
                ></a>
                <a
                  style={{ color: "red" }}
                  onClick={() => eliminarTarea(i)}
                  className="fas fa-trash pointer"
                >
                  {" "}
                </a>
              </div>
            </li>
          </div>
        ))}
      </fieldset>
    </form>
  );
};

export default Caja_principal;
