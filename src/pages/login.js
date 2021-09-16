import * as React from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

function Login() {
  const { login } = useAuth();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
  };

  const handleLoginBtn = (e) => {
    e.preventDefault();
    login(username, password);
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
      </div>
    </div>
  );
}

export default Login;
