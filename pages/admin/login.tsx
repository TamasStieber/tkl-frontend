import { useForm, SubmitHandler } from "react-hook-form";
import styles from "@/styles/Admin.module.css";
import useLogin from "@/hooks/useLogin";
import { ILoginData } from "@/interfaces/interfaces";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginData>();
  const { isLoading, error, attemptLogin } = useLogin();
  return (
    <div className={styles.login_form_container}>
      <form onSubmit={handleSubmit(attemptLogin)}>
        <div className={styles.login_form}>
          {error && <span>{error.message}</span>}
          <input
            type="email"
            placeholder="E-mail address"
            {...register("email", { required: true })}
          />
          {errors.email && <span>This field is required</span>}

          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          {errors.password && <span>This field is required</span>}

          <input type="submit" disabled={isLoading} />
        </div>
      </form>
    </div>
  );
};

export default Login;
