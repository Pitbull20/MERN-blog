import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';

export const Header = () => {
	const isAuth = useSelector(selectIsAuth);

	const onClickLogout = () => {};

	return (
		<div className={styles.root}>
			<Container maxWidth='lg'>
				<div className={styles.inner}>
					<Link className={styles.logo} to='/'>
						<div>ULTRA BLOG</div>
					</Link>
					<div className={styles.buttons}>
						{isAuth ? (
							<>
								<Link to='/posts/create'>
									<Button variant='contained'>
										Написати статтю
									</Button>
								</Link>
								<Button
									onClick={onClickLogout}
									variant='contained'
									color='error'
								>
									Вийти
								</Button>
							</>
						) : (
							<>
								<Link to='/login'>
									<Button variant='outlined'>Ввійти</Button>
								</Link>
								<Link to='/register'>
									<Button variant='contained'>
										Створити акаунт
									</Button>
								</Link>
							</>
						)}
					</div>
				</div>
			</Container>
		</div>
	);
};
