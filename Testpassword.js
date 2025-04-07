const bcrypt = require("bcrypt");

// Replace with the actual hashed password from MongoDB
const storedHash = "$2b$10$2FDBWVXxolaP7sQcIQkQFOJrUlR82gwi.IzsoWotk5CLxLJ.wwI4C";  
const enteredPassword = "Me@123"; // Enter the password you're testing

bcrypt.compare(enteredPassword, storedHash, (err, isMatch) => {
  if (err) console.error("Error comparing:", err);
  console.log("Password Match:", isMatch);
});
