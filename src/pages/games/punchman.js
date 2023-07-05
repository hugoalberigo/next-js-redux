import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import Header from "../../components/Header";
import { addScore } from "../../action/score";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { database } from "../../services/firebase";

function Punchman() {
  const [punchmanScore, setPunchmanScore] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  function handleGenerateScoreClick() {
    const punchmanScore = Math.floor(Math.random() * 10) + 1; // menghasilkan angka acak antara 0 dan 10
    setPunchmanScore(punchmanScore);
    setButtonDisabled(true);
    addScore("users", punchmanScore);
    const uid = localStorage.getItem('uid')
    getDoc(doc(database, "users", uid))
      .then
      (docSnap => {
          if(docSnap.exists()) {
              updateDoc(doc(database, "users", uid), {
                  punchPlayed: 'Already Played'
              })
          } else {
              console.log("No such document!");
          }
      })
    console.log(`Score: ${punchmanScore}`);
    // Lakukan sesuatu dengan skor, seperti memperbarui state komponen Anda
  }
  return (
    <>
      <Header />
      <div className="container text-center">
        <h1 className="text-white">THIS IS PUNCHMAN GAMES</h1>
        <br />
        <Button
          variant="warning"
          onClick={handleGenerateScoreClick}
          disabled={buttonDisabled}
        >
          Click to Generate Score
        </Button>
        <Container className="py-3">
          <h4 className="text-white">Your Current Score :</h4>
          <input
            className="text-center"
            type="text"
            id="score"
            name="score"
            value={punchmanScore || ""}
            readOnly
          />
        </Container>
        <br />
        <Button variant="success" href="/home">
          Exit to Home
        </Button>
        <br />
        <br />
        <Button variant="success" href="/gamelist">
          Exit to Game List
        </Button>
      </div>
    </>
  );
}

export default Punchman;
