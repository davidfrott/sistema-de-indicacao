const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const db = require('./database.js');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post('/register', (req, res) => {
    const { nome, email, senha, referredBy } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ message: 'Nome, e-mail e senha são obrigatórios.' });
    }

    const checkEmailSql = "SELECT * FROM users WHERE email = ?";
    db.get(checkEmailSql, [email], (err, row) => {
        if (err) {
            return res.status(500).json({ message: "Erro no servidor.", error: err.message });
        }
        if (row) {
            return res.status(409).json({ message: 'Este e-mail já está em uso.' });
        }

        const newUser = {
            id: crypto.randomUUID(),
            nome,
            email,
            senha,
            pontuacao: 0,
            codigoIndicacao: crypto.randomUUID()
        };

        const insertSql = 'INSERT INTO users (id, nome, email, senha, pontuacao, codigoIndicacao) VALUES (?,?,?,?,?,?)';
        db.run(insertSql, [newUser.id, newUser.nome, newUser.email, newUser.senha, newUser.pontuacao, newUser.codigoIndicacao], function(err) {
            if (err) {
                return res.status(500).json({ message: "Erro ao cadastrar usuário.", error: err.message });
            }

            if (referredBy) {
                const findReferrerSql = "SELECT * FROM users WHERE codigoIndicacao = ?";
                db.get(findReferrerSql, [referredBy], (err, referrer) => {
                    if (err) { /* Ignora o erro de indicação, mas continua o cadastro */ }
                    if (referrer) {
                        const newScore = referrer.pontuacao + 1;
                        const updateScoreSql = "UPDATE users SET pontuacao = ? WHERE id = ?";
                        db.run(updateScoreSql, [newScore, referrer.id], (err) => {
                             if(err) console.error("Erro ao atualizar pontuação:", err.message);
                             else console.log(`Pontuação de ${referrer.nome} atualizada para ${newScore}.`);
                        });
                    }
                });
            }
            
            const { senha: _, ...userToReturn } = newUser;
            res.status(201).json(userToReturn);
        });
    });
});

app.get('/profile/:email', (req, res) => {
    const { email } = req.params;
    const sql = "SELECT * FROM users WHERE email = ?";
    
    db.get(sql, [email], (err, row) => {
        if (err) {
            return res.status(500).json({ message: "Erro no servidor.", error: err.message });
        }
        if (!row) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        
        const { senha: _, ...userToReturn } = row;
        res.status(200).json(userToReturn);
    });
});


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});