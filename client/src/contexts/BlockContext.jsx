import { createContext, useContext, useState } from "react";
import templates from '../data/templates.json';

const BlockContext = createContext();


export const BlockProvider = ({ children }) => {

    const emailTemplates = templates?.emailTemplates || [];
    const [blockOptSelected, setBlockOptSelected] = useState(false);
    const [nodeType, setNodeType] = useState("");
    const [emailBlock, setEmailBlock] = useState({
        title: emailTemplates[0].title,
        subject: emailTemplates[0].subject,
        body: emailTemplates[0].body,
        emailType: "template",
        variables: emailTemplates[0].variables,
        aiGenerated: false,
    });
    const [waitBlock, setWaitBlock] = useState({
        delay: "",
        format: "Minutes"
    });

    const resetBlock=()=>{
        setEmailBlock({
            title: emailTemplates[0].title,
            subject: emailTemplates[0].subject,
            body: emailTemplates[0].body,
            emailType: "template",
            variables: emailTemplates[0].variables,
            aiGenerated: false,
        });
        setWaitBlock({
            delay: "",
            format: "Minutes"
        });
        setNodeType("");
        setBlockOptSelected(false);
    }

    const handleBlockClick = (nodeType) => {
        setNodeType(nodeType);
        setBlockOptSelected(true);
    }
    
    return (
        <BlockContext.Provider value={{
            emailTemplates,
            blockOptSelected,
            setBlockOptSelected,
            nodeType,
            setNodeType,
            emailBlock,
            setEmailBlock,
            waitBlock,
            setWaitBlock,
            handleBlockClick,
            resetBlock,
        }}>
            {children}
        </BlockContext.Provider>
    )   
}


export const useBlockContext = ()=>useContext(BlockContext);