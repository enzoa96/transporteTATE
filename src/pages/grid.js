import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import { Modal, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "../hooks/useAuth";
import { Create } from "@material-ui/icons";

const columns = [
  { title: "CUIT", field: "codigo", type: "number" },
  { title: "Nombre", field: "nombre" },
  { title: "Telefono", field: "telefono", type: "number" },
  { title: "Contra Reembolso", field: "contrareembolso" },
  { title: "Calificacion", field: "calificacion" },
  { title: "Activo", field: "activo", type: "numeric" },
];
const BASE_URL = "http://api.tate.com.ar:8083/api/Transportes/GetList";
const GRABAR_URL = "http://api.tate.com.ar:8083/api/Transportes/Grabar";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  iconos: {
    cursor: "pointer",
  },
  inputMaterial: {
    width: "100%",
  },
}));

function App() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  const [filaSeleccionada, setFilaSeleccionada] = useState({
    codigo: "",
    nombre: "",
    telefono: "",
    contrareembolso: "",
    calificacion: "",
    activo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value.length);
    console.log(name);
    if (name === "calificacion" && value.length > 1) return;
    if (name === "contrareembolso" && value.length > 2) return;

    setFilaSeleccionada((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { token } = useAuth();

  async function makeGetRequest() {
    let body = { "": "" };

    let res = await axios.post(BASE_URL, body, {
      headers: { Authorization: token },
    });

    let data = res.data;
    setData(data);
  }

  useEffect(() => {
    makeGetRequest();
  }, []);

  const peticionEditar = async () => {
    await axios
      .post(GRABAR_URL, filaSeleccionada, { headers: { Authorization: token } })
      .then((response) => {
        var dataNueva = data;
        console.log(response);
        dataNueva.map((dato) => {
          if (dato.id === filaSeleccionada.id) {
            dato.codigo = filaSeleccionada.codigo;
            dato.nombre = filaSeleccionada.nombre;
            dato.telefono = filaSeleccionada.telefono;
            dato.contrareembolso = filaSeleccionada.contrareembolso;
            dato.calificacion = filaSeleccionada.calificacion;
            dato.activo = filaSeleccionada.activo;
          }
        });
        setData(dataNueva);
        abrirCerrarModalEditar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const seleccionarFila = (fila, caso) => {
    setFilaSeleccionada(fila);
    caso === "Editar" ? abrirCerrarModalEditar() : abrirCerrarModalEliminar();
  };

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };
  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };

  const bodyEditar = (
    <div className={styles.modal}>
      <h3>Editar Fila</h3>
      <TextField
        className={styles.inputMaterial}
        label="CUIT"
        name="codigo"
        onChange={handleChange}
        value={filaSeleccionada && filaSeleccionada.codigo}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Nombre"
        name="nombre"
        onChange={handleChange}
        value={filaSeleccionada && filaSeleccionada.nombre}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Telefono"
        name="telefono"
        onChange={handleChange}
        value={filaSeleccionada && filaSeleccionada.telefono}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Contra Reembolso"
        name="contrareembolso"
        onChange={handleChange}
        value={filaSeleccionada && filaSeleccionada.contrareembolso}
      />
      <TextField
        className={styles.inputMaterial}
        label="Calificacion"
        name="calificacion"
        onChange={handleChange}
        value={filaSeleccionada && filaSeleccionada.calificacion}
      />

      <br />
      <br />
      <div align="right">
        <Button color="primary" onClick={() => peticionEditar()}>
          Grabar
        </Button>
        <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  );

  return (
    <div className="App">
      <MaterialTable
        columns={columns}
        data={data}
        title="Transporte Maestro"
        actions={[
          {
            icon: Create,
            tooltip: "Editar Fila",
            onClick: (event, rowData) => seleccionarFila(rowData, "Editar"),
          },
        ]}
        options={{
          actionsColumnIndex: -1,
          pageSize: 10,
          pageSizeOptions: [10, 20, 30],
        }}
        localization={{
          header: {
            actions: "Acciones",
          },
        }}
      />

      <Modal open={modalEditar} onClose={abrirCerrarModalEditar}>
        {bodyEditar}
      </Modal>
    </div>
  );
}

export default App;
