import { FormEvent, useEffect, useState } from "react";
import Button from "../components/button";
import Input from "../components/input";
import { login } from "../services/authentication";
import { useNavigate, Link } from "react-router-dom";
import ErrorMessage from "../components/errorMessage";


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<any>(null)
  const navigate = useNavigate();

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(!email || !password) return setError({message: 'Preencha todos os campos.'});
    
    try {
      const { token } = await login(email, password);
      localStorage.setItem('accessToken', token);
      navigate('/');
    } catch (error) {
      setError(error)
    }
  };

  useEffect(() => {
    setError(null);
  }, [email, password])

  return (
    <div className="flex flex-col gap-6 items-center w-64">
      <h1 className="text-2xl font-bold">Bem Vindo!</h1>
      <ErrorMessage error={error}/>
      <form onSubmit={(e) => handleLogin(e)} className="flex flex-col gap-3 w-full">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          setValue={setEmail}
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          setValue={setPassword}
        />
        <Button
          type="submit"
          className="bg-primary"
        >
          Entrar
        </Button>
      </form>
      <p>Não tem uma conta? <Link
        className="text-secondary hover:opacity-80 duration-200 ease-out"
        to="/signup"> Registre-se</Link>
      </p>
    </div>
  );
}