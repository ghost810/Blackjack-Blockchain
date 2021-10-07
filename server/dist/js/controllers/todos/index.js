"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAmount = exports.getAmount = void 0;
const balance_1 = __importDefault(require("../../models/balance"));
const getAmount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let getBal = yield balance_1.default.findOne({ 'address': req.params.addr });
        if (!getBal) {
            getBal = new balance_1.default({
                address: req.params.addr,
                amount: 0,
                status: false,
            });
            const newTodo = yield getBal.save();
        }
        res.status(200).json({
            message: 'Balance deleted',
            balance: getBal,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.getAmount = getAmount;
const updateAmount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedBal = yield balance_1.default.findOneAndUpdate({ 'address': req.params.addr }, { address: req.params.addr, amount: req.body.amount, status: false });
        res.status(201).json({
            message: 'Balance updated',
            balance: updatedBal,
        });
    }
    catch (error) {
        throw (error);
    }
});
exports.updateAmount = updateAmount;
