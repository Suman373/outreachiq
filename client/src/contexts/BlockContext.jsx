import { createContext, useContext, useState } from "react";
import templates from '../data/templates.json';
import toast from "react-hot-toast";
import { enhanceBody, enhanceSubject } from "../api/ai";
import { useAuthContext } from "./AuthContext";

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

    const { userObj } = useAuthContext();

    const resetBlock = () => {
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

    const handleTextEnhance = async (type) => {
        try {
            if (type === "subject") {
                if (!emailBlock.subject) return toast.error("Subject text is required");
                const data = await enhanceSubject(userObj.id, emailBlock.subject);
                if (data.status !== 200) throw new Error("Failed to enhance subject");
                console.log("Data is -----", data);
                setEmailBlock(prev => ({ ...prev, subject: data?.data?.result }));
                toast.success('Enhaned with AI successfully');
            }
            if (type === "body") {
                if (!emailBlock.body) return toast.error("Email body text is required");
                const data = await enhanceBody(userObj.id, emailBlock.body);
                if (data.status !== 200) throw new Error("Failed to enhance email body");
                console.log("Data is -----", data);
                setEmailBlock(prev => ({ ...prev, body: data?.data?.result }));
                toast.success('Enhaned with AI successfully');
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to enhance with AI.\nPlease try again later");
        }
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
            handleTextEnhance
        }}>
            {children}
        </BlockContext.Provider>
    )
}


export const useBlockContext = () => useContext(BlockContext);