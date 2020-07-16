const express = require('express');
const sha1 = require('sha1');
const fetch = require('node-fetch');
const port = process.env.PORT || 80;

app = express();
app.use(express.json());
app.listen(port);

app.post('/auth', (req, res) => {
  // Get the password from the request
  const password = req.body['password'];

  if (password) {

    // Shah-1 hash it
    const hashedPassword = sha1(password).toUpperCase();

    // Break it into a prefix and suffix
    const prefix = hashedPassword.substring(0, 5);
    const suffix = hashedPassword.substring(5);

    // Send the first 5 chars to pwned password API
    fetch('https://api.pwnedpasswords.com/range/' + prefix)
      .then(res => res.text())
      .then(body => {

        // Check if the response includes the suffix of the hash
        if (body.includes(suffix)) {

          // If so, return an error
          res.status(400).json({message: 'Please select a more secure password. This one has already been Pwned.'});

        } else {

          // If not, the user is good to go.
          res.status(200).json({message: 'Your password is secure and you may use it to register.'});

        }
      }).catch(err => {

        // Handle any API errors
        console.error(err);
        res.status(400).json({message: 'Something went wrong.'});

      });
  } else {
    res.status(400).json({message: '"password" field not found.'});
  }
});

console.log(`Listening on ${port}`);
