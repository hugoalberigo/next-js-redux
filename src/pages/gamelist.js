import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Table } from "react-bootstrap";
import { checkLogin } from "../action/auth";

import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";

import { database } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";
import { getDoc, doc } from "firebase/firestore";

function LattoModal(props) {
  const [users, setUSers] = useState([]);

  const getUsers = async () => {
    let arrUsers = [];
    let dataUsersRef = collection(database, "users");
    let compileData = await getDocs(dataUsersRef).then((res) => {
      res.forEach((e) => {
        arrUsers.push(e.data());
      });
    });
    return arrUsers;
  };

  useEffect(() => {
    getUsers().then((res) => {
      setUSers(res);
    });
  },[]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Latto-latto
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>The story...</h5>
        <p className="text-justify">
          This game is called Lato-Lato. However, Lato-Lato is not from
          Indonesia. This game is a traditional game originating from the United
          States. In America, this game is known as Clackers Ball. This game is
          also known to Italy as &apos;Lato&apos; in Italian which means side.
          In the late 1960s people were playing a frenzy with two small, heavy
          balls over the strings. This Lato-Lato can explode because it is made
          of acrylic. Until finally, this Lato-Lato game was officially banned.
        </p>
      </Modal.Body>
      <Modal.Body className="text-center">
        <Button variant="warning" href="/games/latto" onClick={props.onHide}>
          Play now
        </Button>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button variant="success" href="/leaderboards" onClick={props.onHide}>
          Leaderboards
        </Button> */}

        <Modal.Body>
          <h2 className="text-center">Leaderboard</h2>
        </Modal.Body>
        <Table striped bordered hover size="">
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {users.map((e, i) => (
              <tr key={e.id}>
                <td>{i + 1}</td>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.score}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Button variant="warning" href="/games/latto" onClick={props.onHide}>
          Play now
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function PrsModal(props) {
  const [users, setUSers] = useState([]);

  const getUsers = async () => {
    let arrUsers = [];
    let dataUsersRef = collection(database, "users");
    let compileData = await getDocs(dataUsersRef).then((res) => {
      res.forEach((e) => {
        arrUsers.push(e.data());
      });
    });
    return arrUsers;
  };

  useEffect(() => {
    getUsers().then((res) => {
      setUSers(res);
    });
  },[]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Paper Rock Scissor
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>The story...</h5>
        <p className="text-justify">
          Rock Paper Scissors is considered the oldest hand game in the world.
          In fact, the game dates all the way back to the Chinese Han Dynasty.
          This era began in 206 BC and ended in 220 AD. There are also accounts
          of this game in Japanese history. The earliest versions of this game
          consisted of a slug, snake, and frog. Rocks, papers, and scissors were
          used in a later version of the game developed in the 17th century. It
          wasn&apos;t until the 1920&apos;s that the popular Asian hand game
          made its way to Great Britain. In 1932, an article in the New York
          Times described the rules of Rock Paper Scissors.
        </p>
      </Modal.Body>
      <Modal.Body className="text-center">
        <Button variant="warning" href="/play" onClick={props.onHide}>
          Play now
        </Button>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button variant="success" href="/leaderboards" onClick={props.onHide}>
          Leaderboards
        </Button> */}

        <Modal.Body>
          <h2 className="text-center">Leaderboard</h2>
        </Modal.Body>
        <Table striped bordered hover size="">
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {users.map((e, i) => (
              <tr key={e.id}>
                <td>{i + 1}</td>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.score}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Button variant="warning" href="/play" onClick={props.onHide}>
          Play now
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function PunchManModal(props) {
  const [users, setUSers] = useState([]);

  const getUsers = async () => {
    let arrUsers = [];
    let dataUsersRef = collection(database, "users");
    let compileData = await getDocs(dataUsersRef).then((res) => {
      res.forEach((e) => {
        arrUsers.push(e.data());
      });
    });
    return arrUsers;
  };

  useEffect(() => {
    getUsers().then((res) => {
      setUSers(res);
    });
  },[]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Punch Man</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>The story...</h5>
        <p className="text-justify">
          One-Punch Man (Japanese: ワンパンマン, Hepburn: Wanpanman) is a
          Japanese superhero manga series created by One. It tells the story of
          Saitama, a superhero who, because he can defeat any opponent with a
          single punch, grows bored from a lack of challenge. One wrote the
          original webcomic manga version in early 2009.
        </p>
      </Modal.Body>
      <Modal.Body className="text-center">
        <Button variant="warning" href="/games/punchman" onClick={props.onHide}>
          Play now
        </Button>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button variant="success" href="/leaderboards" onClick={props.onHide}>
          Leaderboards
        </Button> */}
        <Modal.Body>
          <h2 className="text-center">Leaderboard</h2>
        </Modal.Body>
        <Table striped bordered hover size="">
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {users.map((e, i) => (
              <tr key={e.id}>
                <td>{i + 1}</td>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.score}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Button variant="warning" href="/games/punchman" onClick={props.onHide}>
          Play now
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function GameList() {
  checkLogin();
  const [modalShow1, setModalShow1] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  const [modalShow3, setModalShow3] = useState(false);
  
  const [users, setUsers] = useState({
    latoPlayed: '',
    rpsPlayed: '',
    punchPlayed: ''
  });

  useEffect(() => {
    const uid = localStorage.getItem('uid');
    getDoc(doc(database, "users", uid))
    .then
    (docSnap => {
      if(docSnap.exists()) {
        setUsers({
          ...users, ...docSnap.data() 
        })
      } else {
        console.log("No such document!");
      }
    })
  },[]);

  return (
    <div style={{ backgroundColor: "#659dbd", height:'100vh' }}>
      <Header />
      <h1 className="text-center py-5">GAME LIST</h1>
      <div className="container-fluid pb-5">
        <div className="d-flex justify-content-around">
          <Card style={{ width: "18rem" }} className="shadow">
            <Card.Img variant="top" src="/images/latto.png" />
            <Card.Body>
              <Card.Title>Latto-latto</Card.Title>
              <Card.Text>Full impact with full strength</Card.Text>
              {/* <Button variant="success" href="/game/lattogame">
                Play now
              </Button> */}
              <Button variant="warning" onClick={() => setModalShow1(true)}>
                Click to Play
              </Button>

              <Card.Text className="fst-italic text-muted">
                {users.latoPlayed}
              </Card.Text>

              <LattoModal
                show={modalShow1}
                onHide={() => setModalShow1(false)}
              />
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem" }} className="shadow">
            <Card.Img variant="top" src="/images/prs.png" />
            <Card.Body>
              <Card.Title>Paper Rock Scissor</Card.Title>
              <Card.Text>Only luck can win this game</Card.Text>
              {/* <Button variant="success" href="/play">
                Play now
              </Button> */}

              <Button variant="warning" onClick={() => setModalShow2(true)}>
                Click to Play
              </Button>
              <Card.Text className="fst-italic text-muted">
                {users.rpsPlayed}
              </Card.Text>
              <PrsModal show={modalShow2} onHide={() => setModalShow2(false)} />
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem" }} className="shadow">
            <Card.Img variant="top" src="/images/punchman.png" />
            <Card.Body>
              <Card.Title>Punch Man</Card.Title>
              <Card.Text>Who will get the champion?</Card.Text>
              {/* <Button variant="success" href="/game/punchmangame">
                Play now
              </Button> */}

              <Button variant="warning" onClick={() => setModalShow3(true)}>
                Click to Play
              </Button>
              <Card.Text className="fst-italic text-muted">
                {users.punchPlayed}
              </Card.Text>

              <PunchManModal
                show={modalShow3}
                onHide={() => setModalShow3(false)}
              />
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default GameList;
