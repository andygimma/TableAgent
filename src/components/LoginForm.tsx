import { useForm, SubmitHandler } from "react-hook-form";
import supabaseClient from "../services/supabase";

type Inputs = {
  email: string;
  password: string;
};

export default function App() {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    await supabaseClient.auth.signInWithPassword({
      password: data.password,
      email: data.email,
    });
  };

  // console.log(watch("email"), 1); // watch input value by passing the name of it

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" {...register("email", { required: true })} />
      {errors.password && <span>Email is required</span>}
      <input
        type="password"
        {...register("password", {
          required: true,
          minLength: 8,
        })}
      />
      {errors?.password?.type === "required" && (
        <span>Password is required.</span>
      )}
      {errors?.password?.type === "minLength" && (
        <span>Password must be 8 characters long.</span>
      )}

      <input type="submit" />
    </form>
  );
}
