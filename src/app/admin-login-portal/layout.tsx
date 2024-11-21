import { AuthProvider } from "../../../context/AuthContext"
export default function LoginLayout({children,} : {children: React.ReactNode}) {

    return (
        <AuthProvider>
            <main className="container relative mx-auto max-w-8xl flex-grow px-4 md:px-6">{children}</main>
        </AuthProvider>
        
    )
}