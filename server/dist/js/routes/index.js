"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todos_1 = require("../controllers/todos");
const router = express_1.Router();
router.get('/get-amount/:addr', todos_1.getAmount);
router.put('/put-amount/:addr', todos_1.updateAmount);
exports.default = router;
