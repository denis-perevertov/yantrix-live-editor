const express = require('express');
const router = express.Router();

const prettier = require('prettier');

const { generateAutomata } = require('../api/generateAutomata');

router.post('/', async (req, res) => {
    const { diagramText } = req.body;
    if (!diagramText) res.status(400).json({ files: [], errorText: 'No diagram text found!' });
    
    try {
        const generatedCode = await generateAutomata(diagramText);
        const formattedCode = await prettier.format(generatedCode, { semi: false, parser: 'babel' });

        const result = [
            {
                name: 'TestAutomata_generated.js',
                text: formattedCode,
                language: 'javascript'
            },
            {
                name: 'Test',
                text: 'lol',
                language: 'asd'
            }
        ]
    
        res.json({ files: result, errorText: null });
    }
    catch (e) {
        res.status(400).json({ files: [], errorText: 'Error during automata generation' })
    }
    
});

module.exports = router;