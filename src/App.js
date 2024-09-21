import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import swal from 'sweetalert';

function App() {
  const [provider, setProvider] = useState('');
  const [providers, setProviders] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editProvider, setEditProvider] = useState('');

  useEffect(() => {
    const savedProviders = JSON.parse(localStorage.getItem('providers')) || [];
    setProviders(savedProviders);
  }, []);

  const handleSaveProvider = () => {
    swal({
      title: "¿Estás seguro?",
      text: "¿Deseas guardar este proveedor?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willSave) => {
      if (willSave) {
        const newProviders = [...providers, provider];
        setProviders(newProviders);
        localStorage.setItem('providers', JSON.stringify(newProviders));
        setProvider('');
        swal("Proveedor guardado en localStorage", {
          icon: "success",
        });
      }
    });
  };

  const handleEditProvider = (index) => {
    setEditIndex(index);
    setEditProvider(providers[index]);
  };

  const handleUpdateProvider = () => {
    swal({
      title: "¿Estás seguro?",
      text: "¿Deseas modificar este proveedor?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willUpdate) => {
      if (willUpdate) {
        const updatedProviders = [...providers];
        updatedProviders[editIndex] = editProvider;
        setProviders(updatedProviders);
        localStorage.setItem('providers', JSON.stringify(updatedProviders));
        setEditIndex(null);
        setEditProvider('');
        swal("Proveedor modificado", {
          icon: "success",
        });
      }
    });
  };

  const handleDeleteProvider = (index) => {
    swal({
      title: "¿Estás seguro?",
      text: "¿Deseas eliminar este proveedor?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const updatedProviders = providers.filter((_, i) => i !== index);
        setProviders(updatedProviders);
        localStorage.setItem('providers', JSON.stringify(updatedProviders));
        swal("Proveedor eliminado", {
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="App">
    
      <div className="container mt-5">
        <div className="mb-3">
          <label htmlFor="providerInput" className="form-label">Proveedor</label>
          <input
            type="text"
            className="form-control"
            id="providerInput"
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={handleSaveProvider}>
          Guardar Proveedor
        </button>
        <table className="table mt-5">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Proveedor</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {providers.map((prov, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>
                  {editIndex === index ? (
                    <input
                      type="text"
                      className="form-control"
                      value={editProvider}
                      onChange={(e) => setEditProvider(e.target.value)}
                    />
                  ) : (
                    prov
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <button className="btn btn-success" onClick={handleUpdateProvider}>
                      Modificar
                    </button>
                  ) : (
                    <>
                      <button className="btn btn-warning" onClick={() => handleEditProvider(index)}>
                        Editar
                      </button>
                      <button className="btn btn-danger" onClick={() => handleDeleteProvider(index)}>
                        Eliminar
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;