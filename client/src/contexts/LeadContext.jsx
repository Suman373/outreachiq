import { createContext, useContext, useState } from "react";

const LeadContext = createContext();

export const LeadProvider = ({ children }) => {

    const [selectedLeadTitle, setSelectedLeadTitle] = useState("Sample Leads");
    const [fileName, setFileName] = useState("");
    const [savedLeadLists, setSavedLeadLists] = useState([
        {
            id: "sample-leads",
            title: "Sample Leads", leads: [
                { name: "John Doe", email: "john@example.com" },
                { name: "Jane Smith", email: "jane@sample.com" },
            ]
        },
    ]);

    const resetLeads = () => {
        setFileName("");
        setSavedLeadLists([{
            id: "sample-leads",
            title: "Sample Leads", leads: [
                { name: "John Doe", email: "john@example.com" },
                { name: "Jane Smith", email: "jane@sample.com" },
            ]
        }]);
    }

    return (
        <LeadContext.Provider value={{
            savedLeadLists,
            setSavedLeadLists,
            fileName,
            setFileName,
            selectedLeadTitle,
            setSelectedLeadTitle,
            resetLeads
        }}>
            {children}
        </LeadContext.Provider>
    )
}

// hook to consume context
export const useLeadContext = () => useContext(LeadContext);