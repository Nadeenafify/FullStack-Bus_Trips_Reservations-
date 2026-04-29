require("dotenv").config();
const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const seedTripAmenities = async () => {
  try {
    const [trips] = await db.query("SELECT tripId FROM trips");
    const [amenities] = await db.query("SELECT amenityId FROM amenities");

    const data = [];

    for (const trip of trips) {
      const shuffled = [...amenities].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 3);

      for (const amenity of selected) {
        data.push([trip.tripId, amenity.amenityId]); // ✅ FIX HERE
      }
    }

    await db.query(
      "INSERT INTO trip_amenities (tripId, amenityId) VALUES ?",
      [data]
    );

    console.log("✅ trip_amenities seeded!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedTripAmenities();