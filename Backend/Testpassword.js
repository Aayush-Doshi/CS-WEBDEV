const bcrypt = require("bcrypt");

const storedHash = "$2b$10$2FDBWVXxolaP7sQcIQkQFOJrUlR82gwi.IzsoWotk5CLxLJ.wwI4C";  
const enteredPassword = "Me@123";

bcrypt.compare(enteredPassword, storedHash, (err, isMatch) => {
  if (err) console.error("Error comparing:", err);
  console.log("Password Match:", isMatch);
});
