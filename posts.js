const express = require('express');
const router = express.Router();

// Mock data (simulando um banco de dados)
let links = [
    { 
        id: 1, 
        titulo: "OpenAI", 
        url: "https://www.openai.com", 
        descricao: "Site oficial da OpenAI", 
        data_criacao: new Date(), 
        categoria_id: 1 
    }
];

// Rota para CRIAR um novo link (Create)
router.post('/', (req, res) => {
    const { titulo, url, descricao, categoria_id } = req.body;

    if (!titulo || !url) {
        return res.status(400).json({ error: "Título e URL são obrigatórios." });
    }

    const novoLink = {
        id: links.length + 1,
        titulo,
        url,
        descricao: descricao || "",
        data_criacao: new Date(),
        categoria_id: categoria_id || null
    };

    links.push(novoLink);
    res.status(201).json({ message: "Link criado com sucesso!", link: novoLink });
});

// Rota para LER todos os links (Read)
router.get('/', (req, res) => {
    res.json(links);
});

// Rota para LER um link específico (Read)
router.get('/:id', (req, res) => {
    const link = links.find(l => l.id === parseInt(req.params.id));
    if (!link) return res.status(404).json({ error: 'Link não encontrado.' });
    res.json(link);
});

// Rota para ATUALIZAR um link (Update)
router.put('/:id', (req, res) => {
    const link = links.find(l => l.id === parseInt(req.params.id));
    if (!link) return res.status(404).json({ error: 'Link não encontrado.' });

    const { titulo, url, descricao, categoria_id } = req.body;

    if (titulo) link.titulo = titulo;
    if (url) link.url = url;
    if (descricao) link.descricao = descricao;
    if (categoria_id !== undefined) link.categoria_id = categoria_id;

    res.json({ message: `Link ${req.params.id} atualizado com sucesso!`, link });
});

// Rota para DELETAR um link (Delete)
router.delete('/:id', (req, res) => {
    const index = links.findIndex(l => l.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'Link não encontrado.' });

    links.splice(index, 1);
    res.json({ message: `Link ${req.params.id} deletado com sucesso!` });
});

module.exports = router;
