import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import UserApi from "@/api/user.api";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

const Edit = () => {
    const userApi = new UserApi();
    const router = useRouter();
    const { id } = router.query;
    const [name, setName] = useState([]);
    const [email, setEmail] = useState([]);
    const [userId, setUserId] = useState([]);

    const fetchData = async () => {
        try {
            const response = await userApi.getOne(id);
            setName(response.name);
            setEmail(response.email);
            setUserId(response._id);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handleSubmit = async () => {
        try {
            const response = await userApi.update({
                name,
                email,
                id:userId
            });
            if (response == 201) {
                window.location.href = "/";
            } else if (response == 400) {
            }
        } catch (error) {
            alert("terjadi error");
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    useEffect(() => {
        console.log(name);
    }, [name]);
    return (
        <div className="p-20">
            <TextField id="outlined-basic" label="name" variant="outlined" className="w-full" value={name} onChange={handleNameChange} />
            <TextField id="outlined-basic" label="email" variant="outlined" className="w-full" value={email} onChange={handleEmailChange} />
            <Button onClick={handleSubmit}>submit</Button>
        </div>
    );
};

export default Edit;
