import Button from "../components/button";
import Input from "../components/input";
import { login } from "../services/authentication";
import { useNavigate, Link } from "react-router-dom";
import ErrorMessage from "../components/errorMessage";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'

const loginSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1)
})
type LoginSchema = z.infer<typeof loginSchema>

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, setError, formState: { errors } } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema)
  })

  const handleLogin: SubmitHandler<LoginSchema> = async (data) => {
    const { email, password } = data;

    try {
      const { token } = await login(email, password);
      localStorage.setItem('accessToken', token);
      navigate('/');
    } catch (error) {
      setError("root", { message: String(error) })
    }
  };

  const onError = () => {
    if (errors.email?.type == "invalid_string") {
      setError("root", { message: "Preencha todos os campos corretamente." })
    }
    else {
      setError("root", { message: "Preencha todos os campos." })
    }
  }

  return (
    <div className="flex flex-col gap-6 items-center w-64">
      <h1 className="text-2xl font-bold">Bem Vindo!</h1>
      <ErrorMessage error={errors.root} />
      <form onSubmit={handleSubmit(handleLogin, onError)} className="flex flex-col gap-3 w-full">
        <Input
          placeholder="Email"
          register={register('email')}
        />
        <Input
          placeholder="Senha"
          type="password"
          register={register('password')}
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