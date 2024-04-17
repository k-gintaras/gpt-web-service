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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '';
app.use((0, cors_1.default)({
    origin: ALLOWED_ORIGIN,
    methods: ['POST'],
    allowedHeaders: ['Content-Type'],
}));
app.use(express_1.default.json());
app.post('/gpt-request', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userInput } = req.body;
    try {
        const response = yield axios_1.default.post('https://api.openai.com/v1/engines/davinci/completions', {
            prompt: userInput,
            max_tokens: 100,
            n: 1,
            stop: null,
            temperature: 0.7,
        }, {
            headers: {
                Authorization: `Bearer ${process.env.GPT_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });
        const generatedText = response.data.choices[0].text.trim();
        res.json({ text: generatedText });
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
}));
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
