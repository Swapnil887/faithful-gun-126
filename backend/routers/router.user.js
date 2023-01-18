const express = require("express");
const {Usermodel} = require("../models/model.users");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")


const user_route = express.Router()

user_route.post("/register")
