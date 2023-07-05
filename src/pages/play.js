import React, {useState, useEffect} from "react";
import { checkLogin } from "../action/auth";
import { addScore } from "../action/score";
import { database } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useSelector } from "react-redux";
import Head from "next/head";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.css"
import Header from "../components/Header";
import { useRouter } from "next/router";
import { getDoc, updateDoc, doc } from "firebase/firestore";


const Play = () => {
    const uid = useSelector((state => state.uid));
    const router = useRouter();

    const [users, setUSers] = useState([]);

    const [userPick, setUserPick] = useState('');
    const [comPick, setComPick] = useState('');
    const [round, setRound] = useState(1);
    const [userScore, setUserScore] = useState(0);
    const [comScore, setComScore] = useState(0);
    const [result, setResult] = useState('');
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [isGameOver, setIsGameOver] = useState(false);

    const choice = ['rock', 'paper', 'scissors']

    const WARNA_ABU = "#C4C4C4";

    const handleChoiceClick = (choice) => {
        const choiceBtn = document.querySelectorAll('.player-choice');
        if(choice === "rock"){
            choiceBtn[0].style.backgroundColor = WARNA_ABU;
        }
        else if(choice === "paper"){
            choiceBtn[1].style.backgroundColor = WARNA_ABU;
        }
        else if(choice === "scissors"){
            choiceBtn[2].style.backgroundColor = WARNA_ABU;
        }
        setUserPick(choice);
        comTurn();
        showResult();
        setBtnDisabled(true);
    }

    const comTurn = () => {
        const comBtn = document.querySelectorAll('.com-choice')
        const randomPick = choice[Math.floor(Math.random() * choice.length)];
        if(randomPick === "rock"){
            comBtn[0].style.backgroundColor = WARNA_ABU;
        }
        else if(randomPick === "paper"){
            comBtn[1].style.backgroundColor = WARNA_ABU;
        }
        else if(randomPick === "scissors"){
            comBtn[2].style.backgroundColor = WARNA_ABU;
        }
        setComPick(randomPick)
    } 

    const showResult = () => {
        const vs = document.getElementById("vsText");
        const resultText = document.getElementById("result");
        vs.style.display = "none";
        resultText.style.display = "block";
        if(resultText.textContent === "DRAW"){
            resultText.style.paddingTop = "28px";
        }
        else if(resultText.textContent === "PLAYER 1 WIN"){
            resultText.style.paddingTop = "5px";
        }
        else if(resultText.textContent === "COM WIN"){
            resultText.style.paddingTop = "28px";
        }
    }

    useEffect(() => {
        checkLogin();
        
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

        getUsers().then((res) => {
            setUSers(res);
          });
    }, [])

    useEffect(() => {
        const uid = localStorage.getItem('uid')
        const fight = userPick + comPick;
        const resultText = document.getElementById("result");
        if(userScore <= 1 && comScore <= 1) {
            // Jika Player menang
            if(
                fight === 'rockscissors' ||
                fight === 'paperrock' ||
                fight === 'scissorspaper'
            ) {
                resultText.textContent = 'PLAYER 1 WIN';
                const winRound = userScore + 1;
                setUserScore(winRound);
                if(winRound === 2) {
                    setResult('Congratulation, You Win the Game!');
                    document.getElementById('game-winner').style.display = 'block';
                    document.getElementById('refresh-btn').textContent = 'Play Again';
                    document.getElementById('refresh-btn').style.display = 'block';
                    getDoc(doc(database, "users", uid))
                    .then
                    (docSnap => {
                        if(docSnap.exists()) {
                            updateDoc(doc(database, "users", uid), {
                                rpsPlayed: 'Already Played'
                            })
                        } else {
                            console.log("No such document!");
                        }
                    })
                    if(comScore === 1) {
                        addScore("users", 1);
                    } else if (comScore === 0) {
                        addScore("users", 2);
                    }
                    setIsGameOver(true);
                } else {
                    document.getElementById('refresh-btn').textContent = 'Start Round';
                    document.getElementById('refresh-btn').style.display = 'block';
                }
            }
            // Jika Player kalah
            if(
                fight === 'rockpaper' ||
                fight === 'paperscissors' ||
                fight === 'scissorsrock'
            ) {
                resultText.textContent = 'COM WIN';
                const loseRound = comScore + 1;
                setComScore(loseRound);
                if(loseRound === 2) {
                    setResult('You Lose the Game!');
                    document.getElementById('game-winner').style.display = 'block';
                    document.getElementById('refresh-btn').textContent = 'Play Again';
                    document.getElementById('refresh-btn').style.display = 'block';
                    getDoc(doc(database, "users", uid))
                    .then
                    (docSnap => {
                        if(docSnap.exists()) {
                            updateDoc(doc(database, "users", uid), {
                                rpsPlayed: 'Already Played'
                            })
                        } else {
                            console.log("No such document!");
                        }
                    })
                    setIsGameOver(true);
                } else {
                    document.getElementById('refresh-btn').textContent = 'Start Round';
                    document.getElementById('refresh-btn').style.display = 'block';
                }
            }
            // Jika seri
            if(
                fight === 'rockrock' ||
                fight === 'paperpaper' ||
                fight === 'scissorsscissors'
            ) {
                const resultText = document.getElementById("result");
                resultText.textContent = 'DRAW';
                document.getElementById('refresh-btn').textContent = 'Start Round'
                document.getElementById('refresh-btn').style.display = 'block';
            }
        }
    }, [userPick, comPick]);

    const handleStart = () => {
        const startButton = document.getElementById('refresh-btn');
        const vs = document.getElementById("vsText");
        const resultText = document.getElementById("result");
        const choiceBtn = document.querySelectorAll('.player-choice');
        const comBtn = document.querySelectorAll('.com-choice')
        const roundText = document.getElementById('round-text');
        setBtnDisabled(false)
        let a
        for(a=0; a<3; a++){
            choiceBtn[a].style.backgroundColor = "transparent";
            comBtn[a].style.backgroundColor = "transparent";
        }
        vs.style.display = "block";
        resultText.style.display = "none";
        startButton.style.display = "none";
        startButton.style.display = 'none';
        roundText.style.display = 'block';
        if(userScore === 0 && comScore === 0){

        } else {
            if(resultText.textContent === 'DRAW'){

            } else {
                const nextRound = round + 1;
                setRound(nextRound);
            }
        }
        if (isGameOver === true) {
            setUserScore(0);
            setComScore(0);
            setRound(1);
            setIsGameOver(false);
            document.getElementById('game-winner').style.display = 'none';
        }
    }

    const [isActive, setIsActive] = useState(false)
        
    const leaderboardBtn = () => {
        setIsActive(current => !current)
    }

    return (
        <>
        <Head>
            <meta  name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Header />
        <div className="d-grid" style={{backgroundColor: '#9C835F', gridTemplateColumns:'auto', gridTemplateRows:'auto auto', height:'auto'}}>
            <div id="game-title" className="d-grid contianer" style={{gridTemplateColumns:'auto auto', gridTemplateRows:'auto', marginTop:'10px'}}>
                <h1 className="title" style={{marginLeft:'460px', color:'rgb(255, 191, 44)', textAlign:'center'}}>ROCK PAPER SCISSORS</h1>
                <button id="leaderboard-btn" onClick={leaderboardBtn} 
                style={{justifySelf:'end', borderRadius:'10px', width:'15vw', marginRight:'20px', fontWeight:'bold'}}>Leaderboard</button>
            </div>
            <div className="modal" id="leaderboard" 
            style={{display: isActive ? 'block' : 'none', position:'fixed', overflow:'auto', backgroundColor:'rgba(0, 0, 0, 0.5)', paddingTop:'80px', paddingBottom:'50px', color:'black'}}>
                <span onClick={leaderboardBtn} className="close"
                style={{position:'absolute', right:'35px', top:'15px', fontSize:'40px', fontWeight:'bold', color:'#f1f1f1'}}>&times;</span>
                <div className="modal-content d-grid"
                style={{backgroundColor:'white', margin:'5% auto 15% auto', border:'1px solid #888', width:'60%', textAlign:'left', padding:'30px'}}>
                    <h2 style={{justifySelf:'center'}}>Leaderboard</h2>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Username</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((e, i) => (
                                    <tr key={e.id}>
                                    <td>{i + 1}</td>
                                    <td>{e.username}</td>
                                    <td>{e.score}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="container-fluid" id="game-play">
                <div className="row">
                    <div className="col-lg-5 col-sm-4 d-grid" id="player-hand" style={{justifyItems:'end', paddingRight:'5vw'}}>
                        <div className="name d-grid"
                        style={{width:'223px', fontSize:'36px', fontWeight:'700', color:'black', justifyItems:'center', alignItems:'center'}}>
                            <p id="player-text">PLAYER 1</p>
                        </div>
                    </div>
                    <div className="col-lg-2 col-sm-4 d-grid" style={{justifyItems:'end', paddingRight:'5vw'}}>
                        <div className="round d-grid"
                        style={{width:'223px', fontSize:'36px', fontWeight:'700', color:'black', justifyItems:'center', alignItems:'center'}}>
                            <p style={{display:'none'}} id="round-text">Round: {round}</p>
                        </div>
                    </div>
                    <div className="col-lg-5 col-sm-4" id="com-hand" style={{paddingLeft:'5vw'}}>
                        <div className="name d-grid"
                        style={{width:'223px', fontSize:'36px', fontWeight:'700', color:'black', justifyItems:'center', alignItems:'center'}}>
                            <p id="com-text">COM</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-5 col-sm-4 d-grid" id="player-score" style={{justifyItems:'end', paddingRight:'5vw'}}>
                        <div className="score d-grid"
                        style={{width:'223px', fontSize:'36px', fontWeight:'700', color:'black', justifyItems:'center', alignItems:'center'}}>
                            <p id="player-score-text">Score: {userScore}</p>
                        </div>
                    </div>
                    <div className="col-lg-5 offset-lg-2 col-sm-4 offset-sm-4" id="com-score" style={{paddingLeft:'5vw'}}>
                        <div className="score d-grid"
                        style={{width:'223px', fontSize:'36px', fontWeight:'700', color:'black', justifyItems:'center', alignItems:'center'}}>
                            <p id="com-score-text">Score: {comScore}</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-5 col-sm-4 d-grid" id="player-hand" style={{justifyItems:'end', paddingRight:'5vw'}}>
                        <button data-choice="rock" className="player-choice batu hand-icon" 
                        style={{border:'none', backgroundColor:'rgba(255, 255, 255, 0)', borderRadius:'30px', width:'223px', height:'204px'}}
                        onClick={() => handleChoiceClick('rock')}
                        disabled={btnDisabled}>
                            <Image src="/images/batu-min.png" width="128" height="92" alt="batu" />
                        </button>
                    </div>
                    <div className="col-lg-5 offset-lg-2 col-sm-4 offset-sm-4" id="com-hand" style={{paddingLeft:'5vw'}}>
                        <div className="com-choice batu d-grid"
                        style={{backgroundColor:'rgba(255, 255, 255, 0)', borderRadius:'30px', width:'223px', height:'204px', justifyItems:'center', alignItems:'center'}}>
                            <Image src="/images/batu-min.png" width="128" height="92" alt="batu" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-5 col-sm-4 d-grid" id="player-hand" style={{justifyItems:'end', paddingRight:'5vw'}}>
                        <button data-choice="paper" className="player-choice kertas hand-icon"
                        style={{border:'none', backgroundColor:'rgba(255, 255, 255, 0)', borderRadius:'30px', width:'223px', height:'204px'}}
                        onClick={() => handleChoiceClick('paper')}
                        disabled={btnDisabled}>
                            <Image src="/images/kertas-min.png" width="115" height="150" alt="kertas" />
                        </button>
                    </div>
                    <div className="col-lg-2 col-sm-4">
                        <p id="vsText"
                        style={{height:'186px', fontSize:'144px', fontWeight:'700', color:'#BD0000', textAlign:'center', margin:'0'}}>VS</p>
                        <p id="result"
                        style={{width:'240px', height:'135px', fontSize:'38px', fontWeight:'700', color:'white', backgroundColor:'green', textAlign:'center', margin:'0', paddingTop:'5px', transform:'rotate(-29deg)', display:'none', borderRadius:'10px'}}></p>
                    </div>
                    <div className="col-lg-5 col-sm-4" id="com-hand" style={{paddingLeft:'5vw'}}>
                        <div className="com-choice kertas d-grid"
                        style={{backgroundColor:'rgba(255, 255, 255, 0)', borderRadius:'30px', width:'223px', height:'204px', justifyItems:'center', alignItems:'center'}}>
                            <Image src="/images/kertas-min.png" width="115" height="150" alt="kertas" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-5 col-sm-4 d-grid" id="player-hand" style={{justifyItems:'end', paddingRight:'5vw'}}>
                        <button data-choice="scissors" className="player-choice gunting hand-icon"
                        style={{border:'none', backgroundColor:'rgba(255, 255, 255, 0)', borderRadius:'30px', width:'223px', height:'204px'}}
                        onClick={() => handleChoiceClick('scissors')}
                        disabled={btnDisabled}>
                            <Image src="/images/gunting-min.png" width="134" height="160" alt="gunting" />
                        </button>
                    </div>
                    <div className="col-lg-5 offset-lg-2 col-sm-4 offset-sm-4" id="com-hand" style={{paddingLeft:'5vw'}}>
                        <div className="com-choice gunting d-grid"
                        style={{backgroundColor:'rgba(255, 255, 255, 0)', borderRadius:'30px', width:'223px', height:'204px', justifyItems:'center', alignItems:'center'}}>
                            <Image src="/images/gunting-min.png" width="134" height="160" alt="gunting" />
                        </div>
                    </div>
                </div>
                <div className="d-grid" id="refresh" style={{justifyItems:'center'}}>
                    <button id="refresh-btn" onClick={handleStart}>
                        <p id="start-round">Play Game</p>
                    </button>
                </div>
                <div>
                    <p id="game-winner"
                        style={{fontSize:'50px', textAlign:'center', display:'none', color:"yellow", backgroundColor:'blue', marginTop:'10px'}}>{result}</p>
                </div>
            </div>
        </div>
        </>
    )
}

export default Play;