import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import styles from "./Login.module.scss";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";

export const Login = () => {
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onChange",
    });
    const onSubmit = async (values) => {
        const data = await dispatch(fetchAuth(values));
        if (!data.payload) {
            alert("Не вдалося авторизуватися");
        }
        if ("token" in data.payload) {
            window.localStorage.setItem("token", data.payload.token);
        } else {
            alert("Не вдалося авторизуватися");
        }
    };
    if (isAuth) {
        return <Navigate to="/" />;
    }
    return (
        <Paper classes={{ root: styles.root }}>
            <Typography classes={{ root: styles.title }} variant="h5">
                Вхід в акаунт
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    className={styles.field}
                    label="E-Mail"
                    helperText={errors.email?.message}
                    error={Boolean(errors.email?.message)}
                    fullWidth
                    {...register("email", { required: "Вкажіть пошту" })}
                    type="email"
                />
                <TextField
                    className={styles.field}
                    label="Пароль"
                    fullWidth
                    error={Boolean(errors.password?.message)}
                    helperText={errors.password?.message}
                    {...register("password", { required: "Введіть пароль" })}
                    type="password"
                />
                <Button
                    type="submit"
                    size="large"
                    variant="contained"
                    fullWidth
                >
                    Войти
                </Button>
            </form>
        </Paper>
    );
};