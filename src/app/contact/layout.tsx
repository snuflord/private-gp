import { AuthProvider } from "../../../context/AuthContext"

export default function ContactLayout({children,} : {children: React.ReactNode}) {

    return (
        <AuthProvider>
            <section className="container mx-auto px-4">{children}</section>
        </AuthProvider>
    )
}