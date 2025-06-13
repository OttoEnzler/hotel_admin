import React, {useEffect} from "react";
import { useNavigate, Link } from 'react-router-dom';
import logo from "../img/blacktextLogo.png";
import { Button, Container, Form } from "react-bootstrap";
import axios from '../config/axiosConfig'; 

const LoginPage = () => {
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  // redirigir a home si ya se logueó
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      navigate('/home'); 
    }
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const username = e.target.username.value;
    const contrasenha = e.target.contrasenha.value;

    setLoading(true); // Iniciar carga mientras hacemos la solicitud

    try {
      // Realizar la solicitud a la API de autenticación
      const response = await axios.post('/Auth/login', { 
        username,
        contrasenha,
      });

      // Si la autenticación es exitosa, guardamos el token JWT
      const token = response.data.token; 
      localStorage.setItem('jwtToken', token); // Almacenar el token en localStorage

      setLoading(false); // Finalizar estado de carga

      // Redirigir a la página principal
      window.location.href = '/home';
    } catch (error) {
      setLoading(false); // Finalizar estado de carga
      setError("El usuario o la contraseña son incorrectos"); // Establecer mensaje de error
      console.error('Error de autenticación:', error.response || error.message);
    }
  };


  return (
    <Container fluid className="py-5 container-style">
      <Form className="box-style bg-primary-light" onSubmit={handleSubmit}>
        <img
          style={{ display: "block", margin: "0 auto 20px" }}
          src={logo}
          height="200"
          alt="Logo"
        />
        <Form.Control
          type="text"
          name="username"
          placeholder="nombre"
          className="input-style bg-primary-light" 
          required
        />
        <Form.Control
          type="password"
          name="contrasenha"
          placeholder="contraseña"
          className="input-style bg-primary-light"
          required
        />
        {error && (
          <div
            style={{
              color: "red",
              marginBottom: "15px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}
        <Button type="submit" className="button-style bg-primary-light">
          INGRESAR
        </Button>
        <Link to="/register" className="primary-link">
          Registrarse
        </Link>
      </Form>
    </Container>
  );
};

export default LoginPage;
