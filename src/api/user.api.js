const axios = require("axios");
const url = "http://localhost:3000";

class Users {
    async get() {
        try {
            const response = await axios.get(`${url}`);
            return response.data.data;
        } catch (error) {
            throw error;
        }
    }
    async getOne(payload) {
        try {
            const response = await axios.get(`${url}/${payload}`);
            return response.data.data;
        } catch (error) {
            throw error;
        }
    }
    async post(payload) {
        try {
            const response = await axios.post(`${url}`, {
                name: payload.name,
                email: payload.email,
            });
            console.log(response.status);
            return response.status;
        } catch (error) {
            return response.status;
        }
    }
    async delete(payload) {
        try {
            const response = await axios.delete(`${url}/${payload}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async update(payload) {
        try {
            const response = await axios.patch(`${url}/${payload.id}`, {
                name: payload.name,
                email: payload.email,
            });
            console.log(response);
            return response.status;
        } catch (error) {
            throw error;
        }
    }
}

export default Users;
