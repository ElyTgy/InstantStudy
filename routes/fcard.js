const express = require("express");
const fc = express.Router();
const axios = require("axios");

var url_fdata = "";
fc.get("/fcards", async (req, res) => {
  try {
    const res = await axios.get(url_fdata);
    res.render("fcards", { val: res.data.card_data });
  } catch (e) {
    if (e.response) {
      console.log(e.response.data);
      res.render("fcards", { val: null });
    }
    console.log(e);
  }
});

module.exports = fc;
