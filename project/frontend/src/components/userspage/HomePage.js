import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import "../styles/HomePage.css"
import { REGISTRATION_ROUTE } from "../../utils/consts";

function HomePage() {
  return (
    <div className="home-page">
      <header className="hero-section py-5 text-center home-header ">
        <Container>
          <h1>UNI TEST</h1>
          <p className="lead">
            Эффективное корпоративное тестирование сотрудников компании UNI.
          </p>
          <Button variant="light" className="me-2 home-button" href="/login">
            Войти
          </Button>
          <Button variant="outline-dark" className="me-2 home-button" href={REGISTRATION_ROUTE}>
            Зарегистрироваться
          </Button>
        </Container>
      </header>

      <section className="features-section py-5">
        <Container>
          <h2 className="text-center mb-4">Почему выбирают UNI TEST?</h2>
          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 shadow-sm home-card">
                <Card.Body>
                  <Card.Title>Эффективность</Card.Title>
                  <Card.Text>
                    Система позволяет быстро оценить знания и навыки сотрудников, помогая определить их сильные и слабые стороны.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 shadow-sm home-card">
                <Card.Body>
                  <Card.Title>Гибкость</Card.Title>
                  <Card.Text>
                    Настраивайте тесты под потребности вашей компании: от базовых навыков до специализированных знаний.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 shadow-sm home-card">
                <Card.Body>
                  <Card.Title>Простота использования</Card.Title>
                  <Card.Text>
                    Интуитивно понятный интерфейс, доступный на любом устройстве, делает работу с платформой удобной для всех.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="cta-section bg-light py-5 text-center">
        <Container>
          <h3>Начните тестировать сотрудников уже сегодня!</h3>
          <p>
            Присоединяйтесь к множеству компаний, которые уже используют UNI TEST
            для повышения эффективности своих команд.
          </p>
          <Button className="home-button "  href={REGISTRATION_ROUTE}>
            Зарегистрироваться
          </Button>
        </Container>
      </section>
    </div>
  );
}

export default HomePage;
