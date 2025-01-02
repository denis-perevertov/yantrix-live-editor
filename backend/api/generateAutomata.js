const codegenImports = import('@yantrix/codegen');
const mermaidParserImports = import('@yantrix/mermaid-parser');

const defaultGenerateOptions = {
    className: 'TestAutomata',
    outLang: 'javascript'
}

async function generateAutomata(text, options = defaultGenerateOptions) {
    const { generateAutomataFromStateDiagram } = await codegenImports;
    const { parseStateDiagram, createStateDiagram } = await mermaidParserImports;


    if (text) {
        const parsedText = await parseStateDiagram(text);
        const stateDiagram = await createStateDiagram(parsedText);
        const code = await generateAutomataFromStateDiagram(stateDiagram, options);
        return code;
    }
}

module.exports = { generateAutomata };