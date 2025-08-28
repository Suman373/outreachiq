import { AuthProvider } from "./AuthContext";
import { BlockProvider } from "./BlockContext";
import { FlowProvider } from "./FlowContext";
import { LeadProvider } from "./LeadContext";

const Providers = ({ children }) => {
    return (
        <AuthProvider>
            <LeadProvider>
                <BlockProvider>
                    <FlowProvider>
                        {children}
                    </FlowProvider>
                </BlockProvider>
            </LeadProvider>
        </AuthProvider>
    )
}

export default Providers;