interface GridProps {
    children: React.ReactNode;
}

export default function Grid({ children }: GridProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {children}
        </div>
    )
}