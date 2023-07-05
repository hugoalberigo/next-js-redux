import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import ReactPlayer from 'react-player'
import dynamic from "next/dynamic";
import { checkLogin } from '@/action/auth';

const HomePage = () => {
  checkLogin();
  return (
    <section className="section position-relative">
      <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="intro pr-lg-5">
                <h1 className="mb-4 font-weight-normal line-height-1_4">PLAY TRADITIONAL <span className="text-warning font-weight-medium">GAME</span></h1>
                <p className="text-light mb-4 pb-2">Welcome to the rock paper scissors, this game is well known worldwide, so basically the rule is simple, rock win against scissors, scissors win against paper, and paper win against rock.<b className="text-dark"> Now let's see can you beat against our AI with ungodly skills in this game.</b></p>
                <a href="/play" className="btn btn-warning">
                PLAY GAME <span className="ml-2 right-icon">&#8594;</span>
                </a>
              </div>
            </Col>
            <Col lg={6}>
              <div className="mt-5 mt-lg-0">
                <ReactPlayer url='https://www.youtube.com/watch?v=qWPtKtYEsN4&ab_channel=developedbyed' /> 
              </div>
            </Col>
          </Row>
      </Container>
    </section>
  );
}

export default dynamic (() => Promise.resolve(HomePage), {ssr: false});