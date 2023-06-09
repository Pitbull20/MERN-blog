import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import styles from "./Login.module.scss";

export const Registration = () => {
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
                Створення акаунту
            </Typography>
            <div className={styles.avatar}>
                <Avatar sx={{ width: 100, height: 100 }} />
            </div>
            <TextField className={styles.field} label="Повне ім'я" fullWidth />
            <TextField className={styles.field} label="E-Mail" fullWidth />
            <TextField className={styles.field} label="Пароль" fullWidth />
            <Button
                size="large"
                onClick={onSubmit}
                variant="contained"
                fullWidth
            >
                Зареєструватися
            </Button>
        </Paper>
    );
};
