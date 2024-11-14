
export default function AboutLayout({children,} : {children: React.ReactNode}) {

    return (
        <main className="container relative mx-auto max-w-8xl flex-grow px-4 md:px-6">{children}</main>
    )
}