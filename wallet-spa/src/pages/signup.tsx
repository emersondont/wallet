import Button from "../components/button";
import Input from "../components/input";
import { register as registerUser } from "../services/authentication";
import { useNavigate, Link } from "react-router-dom";
import ErrorMessage from "../components/errorMessage";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'

const sigupSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().min(1),
  password: z.string().min(1),
  passwordConfirm: z.string().min(1)
})
type SignupSchema = z.infer<typeof sigupSchema>

export default function Signup() {
  const navigate = useNavigate();
  const { register, handleSubmit, setError, formState: { errors } } = useForm<SignupSchema>({
    resolver: zodResolver(sigupSchema)
  })

  const handleSignup: SubmitHandler<SignupSchema> = async (data) => {
    const { name, email, password, passwordConfirm } = data;
    
    try {
      if(password === passwordConfirm) {
        await registerUser(name, email, password);
        navigate('/login');
      }
      else {
        setError("root", { message: "As senhas não conferem." })
      }
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
      <h1 className="text-2xl font-bold">Crie sua conta!</h1>
      <ErrorMessage error={errors.root}/>
      <form onSubmit={handleSubmit(handleSignup, onError)} className="flex flex-col gap-3 w-full">
        <Input
          placeholder="Nome"
          register={register('name')}
        />
        <Input
          placeholder="Email"
          register={register('email')}
          
        />
        <Input
          type="password"
          placeholder="Senha"
          register={register('password')}
        />
        <Input
          type="password"
          placeholder="Confirme sua senha"
          register={register('passwordConfirm')}
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