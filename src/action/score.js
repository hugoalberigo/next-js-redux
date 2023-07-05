import { getDoc, doc, updateDoc } from "firebase/firestore"
import { database } from "../services/firebase"

export function addScore(users, point) {
    const uid = localStorage.getItem('uid')
    getDoc(doc(database, users, uid))
    .then
    (docSnap => {
        if(docSnap.exists()) {
            var winScore = docSnap.data().score + point
            updateDoc(doc(database, "users", uid), {
                score: winScore
            })

          } else {
            console.log("No such document!");
          }
    })

}

