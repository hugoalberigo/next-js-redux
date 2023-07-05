import React from "react";
import { Container, Row, Col } from "reactstrap";
import Image from "next/image";
import Layout from "../components/Layout";
import Header from "../components/Header";
import { checkLogout } from "../action/auth";

const LandingPage = () => {
  checkLogout();

  return (
    <>
      <Layout pageTitle="Landing Page Nextjs">
        <Header />
        <section className="section position-relative">
          <Container>
            <Row className="align-items-center">
              <Col lg={6}>
                <div className="pr-lg-5">
                  <h1 className="mb-4 font-weight-normal line-height-1_4">
                    Welcome To Rock-Paper-Scissors{" "}
                    <span className="text-warning font-weight-medium">
                      Game
                    </span>
                  </h1>
                  <p className="text-light mb-4 pb-2">
                    Welcome to the rock paper scissors, this game is well known
                    worldwide, so basically the rule is simple, rock win against
                    scissors, scissors win against paper, and paper win against
                    rock.
                    <b className="text-dark">
                      {" "}
                      Now let&apos;s see can you beat against our AI with
                      ungodly skills in this game.
                    </b>
                  </p>
                  <a href="#" className="btn btn-warning">
                    Login To Play{" "}
                    <span className="ml-2 right-icon">&#8594;</span>
                  </a>
                </div>
              </Col>
              <Col lg={6}>
                <div className="mt-5 mt-lg-0">
                  <Image
                    src={"/images/RPS-background.jpg"}
                    alt="RPSbackground"
                    width="1280"
                    height="768"
                    className="img-fluid mx-auto d-block"
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Layout>
    </>
  );
};
export default LandingPage;
