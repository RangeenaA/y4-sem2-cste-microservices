'use strict';

// App
const app = express();
app.get('/', (req, res) => {
	const markup = `
<!DOCTYPE html>
<html>
<body>
<h2>HTML Forms</h2>
<form action="addItem.js">
  <label for="fname">First name:</label><br>
  <input type="text" id="fname" name="fname" value="John"><br>
  <label for="lname">Last name:</label><br>
  <input type="text" id="lname" name="lname" value="Doe"><br><br>
  <input type="submit" value="Submit">
</form>
</body>
</html>
`
res.send(markup);
});
