require("dotenv").config();
const express = require("express")
const mysql = require("mysql2/promise")
const authMiddleware = require("./middlewares/authMiddleware")

const app = express()

app.use(express.json())

console.log("JWT_SECRET:", process.env.JWT_SECRET);

let db

async function connectDB() {
    try {
        db = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0

        })
        await db.getConnection()
        console.log("connect to database successfully")
    }
    catch (err) {
        console.log("Failed to connect to database", err)
    }
}
connectDB().then(() => {

    const tripsRoutes = require("./routes/trips.routes")(db)
    const citiesRoutes = require("./routes/cities.routes")(db)
    const reservationsRoutes = require("./routes/reservations.routes")(db)
    const seatsRoutes = require("./routes/seats.routes")(db)
    const loginRoutes = require("./routes/auth/login.routes")(db)
    const logoutRoutes = require("./routes/auth/logout.routes")(db)
    const refreshRoutes = require("./routes/auth/refresh.routes")(db)
    const registerRoutes = require("./routes/auth/register.routes")(db)
    const messagesRoutes = require("./routes/messages.routes")(db)
    const amenitiesRoutes = require("./routes/amenities.routes")(db)
    const stripeRoutes = require("./routes/stripePayment.routes")
    const cookieParser = require("cookie-parser");

    app.use(cookieParser());
    const cors = require("cors");

    app.use(cors({
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }));

    

    app.use("/trips", tripsRoutes)
    app.use("/cities", citiesRoutes)

    app.use("/auth/login", loginRoutes)
    app.use("/auth/logout", logoutRoutes)
    app.use("/auth/refresh", refreshRoutes)
    app.use("/auth/register", registerRoutes)

    app.use("/messages", messagesRoutes)
    app.use("/amenities", amenitiesRoutes)
    
    app.use("/api/stripe",authMiddleware,stripeRoutes);
    app.use("/reservations",authMiddleware,reservationsRoutes)
    app.use("/seats", authMiddleware,seatsRoutes)

    

    app.listen(process.env.PORT, () => {
        console.log("hello my backed learn journy", process.env.PORT)
    })
})

