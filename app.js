const express = require("express");
const app = express();
const User = require("./models/User");
const PORT = 3000;

// kalo ga pake ini model nya undefined
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Response pertama");
});

// crud users
app.get("/users", async (req, res) => {
  try {
    const getAllUser = await User.findAll();
    res.status(200).json(getAllUser);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// crud users
app.get("/users/:id", async (req, res) => {
  try {
    const idUser = req.params.id;
    const getUser = await User.findOne({
      where: { id: idUser },
    });
    res.status(200).json(getUser);
  } catch (err) {
    res.status(500).json(err.message);
    // res.status(500).send("Oops... something went wrong!");
  }
});

app.post("/users", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // store data ke database
    const newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json(err.message);
    // res.status(500).send("Oops... something went wrong!");
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const idUser = req.params.id;
    const { username, email, password } = req.body;

    const updateUser = await User.update(
      {
        username,
        email,
        password,
      },
      {
        where: { id: idUser },
      }
    );
    // res.status(200).send("Berhasil update user");
    res.status(200).json("Berhasil update user");
  } catch (err) {
    // res.status(500).send(err.message);
    res.status(500).json(err.message);
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const idUser = req.params.id;
    console.log(idUser);
    const deleteUser = await User.destroy({
      where: { id: idUser },
    });
    res.status(200).json("Berhasil hapus user");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// running server
app.listen(PORT, () => console.log(`Listening on port ${PORT}....`));
