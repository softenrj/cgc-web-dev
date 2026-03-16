import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "node:path";
import fs from "fs";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const filePath = path.join(__dirname, "users.json");

const readUsers = () => {
    if (!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath, "utf-8");
    return data ? JSON.parse(data) : [];
};

const saveUser = (user) => {
    const users = readUsers();
    users.push(user);
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2), "utf-8");
};

app.post("/signup", (req, res) => {
    const { email, pass, name } = req.body;

    if (!name || !email || !pass) {
        return res.status(400).json({
            success: false,
            message: "Please fill all fields"
        });
    }

    const users = readUsers();

    const exists = users.find(u => u.email === email);

    if (exists) {
        return res.status(400).json({
            success: false,
            message: "Email exists"
        });
    }

    const user = {
        name,
        email,
        pass
    };

    saveUser(user);

    console.log("User registered:", user);

    res.status(200).json({
        success: true,
        message: "User registered"
    });
});

app.listen(8080, () => {
    console.log("server is Live on port: 8080");
});