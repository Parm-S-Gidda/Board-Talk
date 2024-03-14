"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const question_routes_1 = __importDefault(require("./routes/question.routes"));
const answer_route_1 = __importDefault(require("./routes/answer.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/questions", question_routes_1.default);
app.use("/api/answers", answer_route_1.default);
app.use("/health", (req, res) => [
    res.status(200).json({
        message: "works",
    }),
]);
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
