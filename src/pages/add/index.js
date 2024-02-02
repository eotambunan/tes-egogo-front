import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";

import UserApi from "@/api/user.api";

const Add = () => {
    const userApi = new UserApi();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            const response = await userApi.post({
                name,
                email,
            });
            if (response == 201) {
                window.location.href = "/";
            } else if (response == 400) {
            }
        } catch (error) {
            alert("email sudah terdaftar");

        }
    };
    return (
        <div className="p-20">
            <TextField id="outlined-basic" label="name" variant="outlined" className="w-full" value={name} onChange={handleNameChange} />
            <TextField id="outlined-basic" label="email" variant="outlined" className="w-full" value={email} onChange={handleEmailChange} />
            <Button onClick={handleSubmit}>submit</Button>
        </div>
    );
};

export default Add;
