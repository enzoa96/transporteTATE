import * as React from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useHistory } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Login() {
  const history = useHistory();

  const { login } = useAuth();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
  };

  const handleLoginBtn = (e) => {
    e.preventDefault();
    login(username, password).then((result) => {
      if (!result) setOpen(true);
      console.log("LOGIN HA RECIBIDO RESULT = " + result);
      if (result) history.go(0);
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className=" h-screen w-full flex flex-col justify-center items-center  ">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10">
        <div className="">
          <h2 className="font-semibold text-lg mr-auto flex flex-col justify-center items-center w-full">
            Maestro Transporte
          </h2>
        </div>

        <div className="form">
          <div className="flex-row w-full text-xs">
            <div className="mb-3 w-full">
              <label className="font-semibold text-gray-600 py-2">
                Usuario<abbr title="required"></abbr>
              </label>
              <input
                name="username"
                placeholder="Ingrese su usuario"
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                required
                type="text"
                value={username}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3 w-full">
              <label className="font-semibold text-gray-600 py-2">
                Contraseña<abbr title="required"></abbr>
              </label>
              <input
                name="password"
                placeholder="Ingrese su contraseña"
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                required
                type="password"
                value={password}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
            <button
              onClick={handleLoginBtn}
              className="mb-2 md:mb-0 bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-500"
            >
              Iniciar Sesión
            </button>
          </div>
        </div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            El nombre de usuario y/o la contraseña que ingresaste no coinciden
            con nuestros registros
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}

export default Login;
