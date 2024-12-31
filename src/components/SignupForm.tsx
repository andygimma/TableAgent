import { useForm, SubmitHandler } from "react-hook-form";
import supabaseClient from "../services/supabase";

type Inputs = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await supabaseClient.auth.signUp({
      email: data?.email,
      password: data?.password,
    });
  };

  const password = watch("password");
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" {...register("email", { required: true })} />
      {errors.password && <span role="alert">Email is required</span>}
      <input
        type="password"
        {...register("password", {
          required: true,
          minLength: 8,
        })}
      />
      {errors?.password?.type === "required" && (
        <span role="alert">Password is required.</span>
      )}
      {errors?.password?.type === "minLength" && (
        <span role="alert">Password must be 8 characters long.</span>
      )}
      <input
        type="password"
        {...register("passwordConfirmation", {
          required: "Confirm Password is required",
          validate: (value) => value === password || "Passwords do not match",
        })}
      />
      {errors?.passwordConfirmation?.type === "required" && (
        <span role="alert">Password Confirmation is required.</span>
      )}
      {errors?.passwordConfirmation?.type === "validate" && (
        <span>Passwords do not match.</span>
      )}

      <input type="submit" />
    </form>
  );
}
