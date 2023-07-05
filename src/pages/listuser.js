import React from "react";
import Header from "../components/Header";
import { Table, Container } from "reactstrap";
import { database } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";

function UserList() {
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
    }, []);
  
    return (
        <div>
            <Header />
            <h1 className="container text-center py-5 text-white">List User</h1>
            <Container className="mt-3">
            <div className="container-fluid">
                <Table hover className="bg-light">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((e, i) => (
                            <tr key={e.id}>
                                <td>{i + 1}</td>
                                <td>{e.name}</td>
                                <td>{e.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            </Container>
        </div>
    )
}

export default UserList