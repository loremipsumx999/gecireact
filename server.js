import cors from "cors";
import express from "express";
import argon from "argon2";
import mysql from "mysql2/promise";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
const port= 3000;

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'doga_db',
});

app.post("/regUser", async (req, res) => {
    const { username, password, phone_number, address } = req.body;
    try{
        const [users] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
        if(users.length > 0){
             return res.status(400).json({message: "Username already exists."});
        }

        const hashedPassword = await argon.hash(password);

        await db.query("INSERT INTO users (username, password, phone_number, address) VALUES (?, ?, ?, ?)", [username, hashedPassword, phone_number, address]);
        res.status(201).json({message: "User registered successfully."});
    } catch (err){
        console.error("Error during register: ", err);
        res.status(500).json({message: "Error registering user."});
    }
});

//LogIn
app.post("/logUser", async (req, res) => {
    const { username, password } = req.body;

    try{
        //Keresés
        const [users] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
        if(users.length === 0){
            return res.status(400).json({message: "Invalid credentials."});
        }
        const user = users[0];

        //Jelszó ellenőrzése
        const isMatch = await argon.verify(user.password, password);
        if (!isMatch){
            return res.status(400).json({message: "Invalid credentials."});
        }

        //JWT token
        const token = jwt.sign({id: user.id, username: user.username}, process.env.JWT_SECRET, {expiresIn: "1h"});
        res.json({token});
    } catch (err){
        console.error("Error during login backend", err);
        res.status(500).json({message: "Error logging in backend."});
    }
});

app.put("/updateUser", async (req, res) => {
    const { token } = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      const { username, newPassword } = req.body;
  
      const [users] = await db.query("SELECT * FROM users WHERE id = ?", [decoded.id]);
      if (users.length === 0) {
        return res.status(400).json({ message: "User not found" });
      }
  
      const user = users[0];
  
      const hashedPassword = newPassword ? await argon.hash(newPassword) : user.password;
  
      await db.query("UPDATE users SET username = ?, password = ?, phone_number = ?, address =? WHERE id = ?", [username || user.username, hashedPassword, phone_number, address, decoded.id]);
      res.json({ message: "Profile updated successfully" });
    } catch (err) {
      console.error("Error updating profile:", err);
      res.status(500).json({ message: "Error updating profile" });
    }
});

app.get("/user", async (req, res) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: "Unauthorized: No token provided." });
    }

    const token = authorization.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Invalid token format." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const [users] = await db.query("SELECT id, username FROM users WHERE id = ?", [decoded.id]);

        if (users.length === 0) {
            return res.status(404).json({ message: "User not found." });
        }

        res.json({ id: users[0].id, username: users[0].username });
    } catch (err) {
        console.error("Error in /user route:", err);
        res.status(401).json({ message: "Unauthorized: Invalid token." });
    }
});

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
})