import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

function About() {
  return (
    <div className="about-page py-5" style={{ backgroundColor: "#f8f9fa" }}>
      <Container>
        <Row className="mb-4 text-center">
          <Col>
            <h2 className="fw-bold">About Us</h2>
            <p className="text-muted">
              Redefining shopping with trust, quality, and innovation.
            </p>
          </Col>
        </Row>

        <Row className="align-items-center">
          <Col md={6}>
            <img
              src="https://www.ecuadelivery.com/wp-content/uploads/2020/10/Shopping.jpg"
              alt="About our store"
              className="img-fluid rounded shadow"
            />
          </Col>
          <Col md={6}>
            <h3 className="fw-semibold">Who We Are</h3>
            <p>
              We’re not just an e-commerce platform, we’re a community built on
              the belief that shopping should be effortless, affordable, and
              exciting. From everyday essentials to premium lifestyle products,
              we curate collections that blend quality with value.
            </p>
            <p>
              Our journey started with a simple mission: to make online shopping
              personal again. Every product you see on our platform is chosen
              with care, keeping your lifestyle and convenience in mind.
            </p>
          </Col>
        </Row>

        <Row className="mt-5 text-center">
          <h3 className="fw-semibold mb-4">What Sets Us Apart</h3>
          <Col md={4}>
            <Card className="p-3 shadow-sm rounded">
              <h5 className="fw-bold">Curated Quality</h5>
              <p>
                We handpick only trusted brands and reliable products to ensure
                you shop with confidence every time.
              </p>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="p-3 shadow-sm rounded">
              <h5 className="fw-bold">Customer First</h5>
              <p>
                Our 24/7 support and hassle-free return policies mean you can
                shop stress-free, knowing we’ve got your back.
              </p>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="p-3 shadow-sm rounded">
              <h5 className="fw-bold">Sustainable Choices</h5>
              <p>
                We partner with eco-friendly brands and prioritize packaging
                that respects the planet we all share.
              </p>
            </Card>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col className="text-center">
            <h4 className="fw-semibold">Our Promise</h4>
            <p className="mx-auto" style={{ maxWidth: "700px" }}>
              Every time you shop with us, you’re not just making a purchase—you
              become part of a growing family that values trust, innovation, and
              sustainability. We promise to keep raising the bar so your
              shopping experience only gets better.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default About;
