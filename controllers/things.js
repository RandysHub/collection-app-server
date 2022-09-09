const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Remember INDUCES
// Index
router.post("/api/register", async (req, res) => {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    console.log(user);
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error", error: "Duplicate email" });
  }
});

router.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  console.log(user);

  if (user) {
    const token = jwt.sign(
      {
        name: req.body.name,
        email: req.body.email,
      },
      "g1o1d1a1"
    );

    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "error", user: false });
  }
  res.json({ status: "ok" });
});

router.get("/api/library", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, "g1o1d1a1");
    const email = decoded.email;
    const user = await User.findOne({ email: email });
    return res.json({ status: "ok", library: user.library });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }

  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  console.log(user);

  if (user) {
    const token = jwt.sign(
      {
        name: req.body.name,
        email: req.body.email,
      },
      "g1o1d1a1"
    );

    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "error", user: false });
  }
  res.json({ status: "ok" });
});

router.post("/api/library", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, "g1o1d1a1");
    const email = decoded.email;
    await User.updateOne(
      { email: email },
      // { $set: { library: req.body.library } }
      { $push: { library: req.body.library } }
    );
    return res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }

  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  console.log(user);

  if (user) {
    const token = jwt.sign(
      {
        name: req.body.name,
        email: req.body.email,
      },
      "g1o1d1a1"
    );

    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "error", user: false });
  }
  res.json({ status: "ok" });
});

router.put("/api/library/:id", async (req, res) => {
      console.log('t')
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, "g1o1d1a1");
    const email = decoded.email;
    await User.updateOne(
      { email: email },
      { $pull: { library: { id:req.params.id }} },
      { new:true }
    );
      console.log('wut')
    return res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }


  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  console.log(user);

  if (user) {
    const token = jwt.sign(
      {
        name: req.body.name,
        email: req.body.email,
      },
      "g1o1d1a1"
    );

    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "error", user: false });
  }
  res.json({ status: "ok" });
});
module.exports = router;
