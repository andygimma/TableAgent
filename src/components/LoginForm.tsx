import { useForm, SubmitHandler } from "react-hook-form";
import supabaseClient from "../services/supabase";
import { Link } from "react-router-dom";
import { useState } from "react";

type Inputs = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const [supabaseError, setSupabaseError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    const { error } = await supabaseClient.auth.signInWithPassword({
      password: formData.password,
      email: formData.email,
    });

    if (error) {
      setSupabaseError(error.message);
    }
  };

  return (
    <>
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
        {supabaseError && <span role="alert">{supabaseError}</span>}

        <input type="submit" />
      </form>
      <p>Don't have an accout yet?</p>
      <p>
        <Link to="/signup">Signup</Link>
      </p>
    </>
  );
}
