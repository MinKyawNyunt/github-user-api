import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

interface UserCardProps {
    id: string,
    content: React.ReactNode;
    footer: React.ReactNode;
    onClick?: (id: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ id, content, footer, onClick }) => {

    const handleClick = () => {
        if (onClick) {
            onClick(id)
        }
    };

    return (
        <Card className="w-full shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400" onClick={() => handleClick()}>
            <CardHeader>
                {/* <CardTitle>Create project</CardTitle> */}
                {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
            </CardHeader>
            <CardContent className="flex justify-center items-center">
                {content}
            </CardContent>
            <CardFooter className="flex justify-center items-center">
                {footer}
            </CardFooter>
        </Card>
    )
}

export default UserCard;