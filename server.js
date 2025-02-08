require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 10000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const ASSISTANT_ID = process.env.ASSISTENT_ID;

// Rota raiz redirecionando para index.html na raiz do projeto
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/chat", async (req, res) => {
    const { userMessage } = req.body;

    if (!userMessage) {
        return res.status(400).json({ error: "Mensagem do usuário não foi recebida." });
    }

    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4",
                messages: [{ role: "user", content: userMessage }],
                max_tokens: 150
            },
            {
                headers: {
                    "Authorization": `Bearer ${OPENAI_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        console.log("Resposta da API:", response.data);

        if (response.data.choices && response.data.choices.length > 0) {
            res.json({ botReply: response.data.choices[0].message.content });
        } else {
            res.json({ botReply: "Desculpe, não consegui entender. Tente novamente!" });
        }
    } catch (error) {
        console.error("Erro na API do ChatGPT:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Erro ao processar a resposta da IA." });
    }
});

app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
