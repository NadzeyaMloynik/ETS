import React, {useContext, useState} from 'react';
import {Button, ButtonGroup, Card, Container, Form, Row,} from "react-bootstrap";
import {NavLink, useLocation, } from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE,} from "../../utils/consts";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import Col from "react-bootstrap/Col";



const Auth = observer(() => {

    const location = useLocation();
    const isLogin=location.pathname === LOGIN_ROUTE;

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')

    const navigate= useNavigate();

    const clearFolders = () => {
        setEmail('');
        setPassword('');
        setRePassword('')
    }

    const click = async () =>{
     let data
     try{
         if (isLogin){
            //  data = await login(email, password);
            //  console.log(data)
            //  user.setUser(data)
            //  user.setIsAuth(true)
            // navigate(SHOP_ROUTE)
         }
         else {
            //  data = await registration(email,password,rePassword);
            // clearFolders()
            //   navigate(LOGIN_ROUTE)
         }


     }
     catch(e) {
         alert(e.response.data.message)
     }
    }



    return (
        <Container className="d-flex justify-content-center align-items-center"
        style={{height: window.innerHeight-54}}>

            <Card style ={{width: 600}} className="p-5">
            <h2 className="m-auto">
                {isLogin ? 'Авторизация':'Регистрация' }</h2>
                <Form className="mt-3 d-flex flex-column align-items-center" >
                    {isLogin?
                        <Container>
                        <Form.Control
                        className="mt-2"
                        placeholder="Введите email"

                        value={email}
                        onChange={e=>setEmail(e.target.value)}

                        />
                        <Form.Control
                        className="mt-2"
                        placeholder="Введите пароль"
                        value={password}
                        onChange={e=>setPassword(e.target.value)}
                        type="password"/>
                        </Container>
                        :
                        <Container>
                            <Form.Control
                                className="mt-2"
                                placeholder="Введите email"
                                value={email}
                                onChange={e=>setEmail(e.target.value)}
                            />
                            <Form.Control
                                className="mt-2"
                                placeholder="Введите пароль"
                                value={password}
                                onChange={e=>setPassword(e.target.value)}
                                type="password"
                            />

                            <Form.Control
                                className="mt-2"
                                placeholder="Повторите пароль"
                                value={rePassword}
                                onChange={e=>setRePassword(e.target.value)}
                                type="password"
                            />
                        </Container>

                    }

                    <Container>

                        {isLogin?
                            <Row className="mt-4">
                                <Col md={6}>
                                    <NavLink className="auth-link" to={REGISTRATION_ROUTE}>
                                        Зарегистрироваться
                                    </NavLink>
                                </Col>
                                <Col md={6} className="d-flex justify-content-end align-items-end">
                                    <Button
                                        className="auth-button"
                                        variant={"outline-dark"}
                                        onClick={click}
                                    >
                                        Войти
                                    </Button>
                                </Col>
                            </Row>
                            :
                            <Row className="mt-4">
                                <Col md={6}>
                                    <NavLink className="auth-link" to={LOGIN_ROUTE}>
                                        Войти
                                    </NavLink>
                                </Col>
                                <Col md={6} className="d-flex justify-content-end align-items-end">
                                    <Button
                                        className="auth-button"
                                        variant={"outline-dark"}
                                        onClick={click}
                                    >
                                        Зарегистрироваться
                                    </Button>
                                </Col>
                            </Row>
                        }
                    </Container>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;