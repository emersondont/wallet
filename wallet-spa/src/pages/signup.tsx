import { FormEvent, useState, useEffect } from "react";
import Button from "../components/button";
import Input from "../components/input";
import { register } from "../services/authentication";
import { useNavigate, Link } from "react-router-dom";
import ErrorMessage from "../components/errorMessage";

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState<any>(null)
  const navigate = useNavigate();

  const handleSignup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(!name || !email || !password || !passwordConfirm)  {
      return setError({message: 'Preencha todos os campos.'});
    }
    
    try {
      if(password === passwordConfirm) {
        await register(name, email, password);
        navigate('/login');
      }
      else {
        setError({message: 'As senhas não conferem.'});
      }
    } catch (error) {
      setError(error)
    }
  };

  useEffect(() => {
    setError(null);
  }, [name, email, password, passwordConfirm])

  return (
    <div className="flex flex-col gap-6 items-center w-64">
      <h1 className="text-2xl font-bold">Crie sua conta!</h1>
      <ErrorMessage error={error}/>
      <form onSubmit={(e) => handleSignup(e)} className="flex flex-col gap-3 w-full">
        <Input
          type="text"
          placeholder="Nome"
          value={name}
          setValue={setName}
        />
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
        <Input
          type="password"
          placeholder="Confirme sua senha"
          value={passwordConfirm}
          setValue={setPasswordConfirm}
        />
        <Button
          type="submit"
          className="bg-primary"
        >
          Criar conta
        </Button>
      </form>
      <p>Já tem uma conta? <Link
        className="text-secondary hover:opacity-80 duration-200 ease-out"
        to="/login">Entre</Link>
      </p>
    </div>
  );
}