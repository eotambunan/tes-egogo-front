import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";

import UserApi from "@/api/user.api";
import { useRouter } from "next/router";

const home = () => {
    const userApi = new UserApi();
    const router = useRouter();
    const [userData, setUserData] = useState([]);
    const fetchData = async () => {
        try {
            const response = await userApi.get();
            setUserData(response);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };
    const handleAdd = () => {
        router.push("/add");
    };
    const handleEdit = (id) => {
        router.push(`/edit/${id}`);
    };
    const handleDelete = async (id) => {
        try {
            await userApi.delete(id);
            fetchData();
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div>
            <div>
                <button className="bg-blue-500 mx-2">home</button>
                <button className="bg-slate-500 mx-2" onClick={handleAdd}>
                    new customer
                </button>
                <button className="bg-teal-500 mx-2">customer list</button>
            </div>
            <div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>No</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userData.map((item, index) => {
                                return (
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {item.name}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {item.email}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            <button
                                                className="bg-green-300 mx-2"
                                                onClick={(id) => {
                                                    handleEdit(item._id);
                                                }}
                                            >
                                                edit
                                            </button>
                                            <button className="bg-red-300 mx-2" onClick={(id) => handleDelete(item._id)}>
                                                delete
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default home;
