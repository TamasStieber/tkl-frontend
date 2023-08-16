import { useForm, SubmitHandler } from "react-hook-form";
import styles from "@/styles/Admin.module.css";
import useLogin from "@/hooks/useLogin";
import { ILoginData } from "@/interfaces/interfaces";
import { useRouter } from "next/router";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginData>();
  const { isLoading, error, isLoggedIn, attemptLogin } = useLogin();
  const router = useRouter();

  if (isLoggedIn) {
    router.push("/admin");
    return null;
  }

  if (isLoggedIn === false) {
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

            <button type="submit" disabled={isLoading}>
              Log in
            </button>
          </div>
        </form>
      </div>
    );
  }

  return null;
};

export default Login;
