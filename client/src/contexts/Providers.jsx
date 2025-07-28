import { AuthProvider } from "./AuthContext";
import { BlockProvider } from "./BlockContext";
import { FlowProvider } from "./FlowContext";
import { LeadProvider } from "./LeadContext";

const Providers = ({ children }) => {
    return (
        <AuthProvider>
            <LeadProvider>
                <FlowProvider>
                    <BlockProvider>
                        {children}
                    </BlockProvider>
                </FlowProvider>
            </LeadProvider>
        </AuthProvider>
    )
}

export default Providers;