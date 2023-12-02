const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const becrypt = require('bcryptjs')

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/demo");
  console.log("db Connected");
}

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  cnic: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  balance: { type: Number, default: 0 },
  state: { type: String, enum: ["active", "freeze"], default: "active" },
});

const User = mongoose.model("User", userSchema);

const server = express();
server.use(cors());
server.use(bodyParser.json());

server.get("/demo", async (req, res) => {
  const docs = await User.find({});
  console.log(docs);
  res.json(docs);
});


server.post("/demo", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (user) {
      // Compare the provided password with the hashed password stored in the database
      const passwordMatch = await becrypt.compare(password, user.password);

      if (passwordMatch) {
        console.log("User found, password matched");
        res.sendStatus(200);
      } else {
        console.log("User not found, password does not match");
        res.sendStatus(401); // Unauthorized
      }
    } else {
      console.log("User not found");
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

server.get('/balance', async (req, res) => {
  const { email } = req.query;

  try {
    const user = await User.findOne({ email });

    if (user) {
      const balance = user.balance;
      res.json({ balance });
    } else {
      res.sendStatus(404); // User not found
    }
  } catch (error) {
    console.error('Error fetching balance:', error);
    res.sendStatus(500);
  }
});

server.post("/signup", async (req, res) => {
  let user = new User();
  user.username = req.body.username;
  user.cnic = req.body.cnic;
  user.email = req.body.email;
  const hashPassword = await becrypt.hash(req.body.password, 4);
  user.password = hashPassword

  const doc = await user.save();

  console.log(doc);
  console.log(hashPassword);
  res.json(doc);
});

server.delete("/deleteUser", async (req, res) => {
  const { email, password } = req.query;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (user) {
      // Compare the provided password with the hashed password stored in the database
      const passwordMatch = await becrypt.compare(password, user.password);

      if (passwordMatch) {
        // If passwords match, delete the user
        await User.findOneAndDelete({ email });
        console.log("User found, password matched, and deleted");
        res.sendStatus(200);
      } else {
        console.log("User not found, password does not match");
        res.sendStatus(401); // Unauthorized
      }
    } else {
      console.log("User not found");
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// server.delete("/deleteUser", (req, res) => {
//   const { email, password } = req.query;

//   User.findOneAndDelete({ email, password })
//     .then((user) => {
//       if (user) {
//         console.log("User found and deleted");
//         res.sendStatus(200);
//       } else {
//         console.log("User not found");
//         res.sendStatus(404);
//       }
//     })
//     .catch((err) => {
//       console.error(err);
//       res.sendStatus(500);
//     });
// });

server.put("/updatePassword", (req, res) => {
  const { password, newPassword } = req.body;

  // Find the user by password
  User.findOne({ password })
    .then((user) => {
      if (!user) {
        console.log("User not found");
        res.sendStatus(404);
        return;
      }

      // Update the user password
      user.password = newPassword;

      // Save the updated user
      user
        .save()
        .then(() => {
          console.log("Password updated successfully");
          res.sendStatus(200);
        })
        .catch((error) => {
          console.error(error);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});




const router = express.Router();
const stripe = require('stripe')('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');

router.get('/getApiKey', (req, res) => {
  res.status(200).json({ stripeApiKey: 'pk_live_51N90odD2X1XNDwlf5kXWfSnrvr5hQEZRUId44hbcoQ63HFRcFecClczr6Fr7SutUC9GPEvcxb2hBIUg6lnbmnsY100h0fJwZRf' });
});

// router.get('/getApiKey', (req, res) => {
//   res.status(200).json({ stripeApiKey: 'pk_test_51N7w3NDGcuXwz79uImJ0lYGDJdP5r66zJETB2IPCm7TaVTP49QufvN3X33wQNSsRf2UCXqzUdf7GW7zSgyjPe3kr00jzZh3mPB' });
// });
const stripefake = require('stripe')('sk_test_51N7w3NDGcuXwz79usrZkEQ5Z7WYhX5el8lpZF6NlHF9DYO5McxzE87RBrDruwdceyEbbi80Wqu6KjhK1QtELdE45002emsQkGg');

server.post('/processPayment', async (req, res) => {
  const val = req.body.balance;
  const bal = 100;
 const amount = val * bal;
  console.log(amount);
  try {
    const paymentIntent = await stripefake.paymentIntents.create({
      amount: amount,
      currency: 'usd',
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post('/processTopup', async (req, res) => {
  const { cardNumber, cvv, email, expMonth, expYear } = req.body;
  const amount = 60;

  try {
    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card: {
        number: '5590490012628952',
        cvc: '075',
        exp_month: '08',
        exp_year: '27',
      },
      billing_details: {
        email: 'irtazazul@gmail.com',
      },
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      payment_method: paymentMethod.id,
      confirm: true,
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


server.post('/send-balance', async (req, res) => {
  const { senderEmail, recipientEmail, balance } = req.body;

  console.log(senderEmail);
  console.log(recipientEmail);
  console.log(balance);
  
  try {
     // Find recipient user document and increment the balance
     const recipientUser = await User.findOneAndUpdate(
      { email: recipientEmail },
      { $inc: { balance: balance } },
      { new: true }
    );
    //console.log(recipientUser);

    // Find sender user document and decrement the balance
    if(recipientUser)
    {
      const senderUser = await User.findOneAndUpdate(
        { email: senderEmail },
        { $inc: { balance: -balance } },
        { new: true }
      );

    }

    // Send response with updated sender and recipient details
    //res.json({ sender: senderUser, recipient: recipientUser });
    res.end();
  } catch (error) {
    console.error('Error sending balance:', error);
  }
});

server.use(express.json());
server.use('/', router);

server.listen(8080, () => {
  console.log("server started");
});


