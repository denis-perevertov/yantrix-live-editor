import { LanguageIcon } from "../components/LanguageIcon";
import { useEffect, useState } from "react"
import { ReadonlyEditor } from "../components/ReadonlyEditor"
import { Button } from "../components/ui/button"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "../components/ui/resizable";

export const CodeView = ({ generatedFiles }) => {

    const { files, errorText } = generatedFiles;
    const filesPresent = files.length > 0;

    console.log('files: ', files);
    console.log('error text: ', errorText);

    const [selectedFile, setSelectedFile] = useState(null);

    const text = errorText ? `ERROR:\n\n${errorText}` : (selectedFile?.text ?? '');
    const language = errorText ? '' : (selectedFile?.language ?? '');

    const toggleSelectedFile = (index) => {
        if (files && files[index]) {
            setSelectedFile(files[index]);
        }
    }

    useEffect(() => {
        if (files && files[0]) {
            setSelectedFile(files[0]);
        }
        else {
            setSelectedFile(null);
        }
    }, [files]);

    return (
        <ResizablePanelGroup direction="horizontal" className="view w-full h-4/5 flex text-white">
            <ResizablePanel defaultSize={25} className="files w-1/5 bg-dark font-secondary">
                <div className="p-2">
                    <h3>Files</h3>
                </div>
                <hr className="mb-2 border-black" />
                {filesPresent
                    ? files.map((file, index) => (
                    <Button variant={selectedFile === files[index] ? 'selected' : 'ghost'}
                        key={index}
                        className={`w-full justify-start rounded-none transition-none ${selectedFile === files[index] ? 'font-bold disabled' : ''}`}
                        onClick={e => toggleSelectedFile(index)}
                    >
                        <LanguageIcon language={file.language} />
                        {file.name}
                    </Button>
                    ))
            : <p className='text-center font-normal text-sm'> -- no files -- </p> }
            </ResizablePanel>
            <ResizableHandle withHandle className="bg-black opacity-20 hover:opacity-80 transition z-10" />
            <ResizablePanel>
                <ReadonlyEditor text={text} language={language} />
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}