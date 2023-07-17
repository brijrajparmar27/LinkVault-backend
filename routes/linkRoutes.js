const express = require("express");
const { fetchLinks, postLinks } = require("../controllers/linkController");

const linkRouter = express.Router();

linkRouter.get("/links", fetchLinks);
linkRouter.post("/links", postLinks);

module.exports = linkRouter;
