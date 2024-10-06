import { Skeleton } from "@/components/ui/skeleton";
import Grid from "@/components/grid";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

export default function Loader() {
    return (
        <Grid>
            <Card className="w-full shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400">
                <CardHeader>
                </CardHeader>
                <CardContent className="flex justify-center items-center">
                    <Skeleton className="h-[252px] w-[250px] rounded-xl" />
                </CardContent>
                <CardFooter className="flex justify-center items-center">
                    <Skeleton className="h-4 w-full" />
                </CardFooter>
            </Card>

            <Card className="w-full shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400">
                <CardHeader>
                </CardHeader>
                <CardContent className="flex justify-center items-center">
                    <Skeleton className="h-[252px] w-[250px] rounded-xl" />
                </CardContent>
                <CardFooter className="flex justify-center items-center">
                    <Skeleton className="h-4 w-full" />
                </CardFooter>
            </Card>

            <Card className="w-full shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400">
                <CardHeader>
                </CardHeader>
                <CardContent className="flex justify-center items-center">
                    <Skeleton className="h-[252px] w-[250px] rounded-xl" />
                </CardContent>
                <CardFooter className="flex justify-center items-center">
                    <Skeleton className="h-4 w-full" />
                </CardFooter>
            </Card>

            <Card className="w-full shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400">
                <CardHeader>
                </CardHeader>
                <CardContent className="flex justify-center items-center">
                    <Skeleton className="h-[252px] w-[250px] rounded-xl" />
                </CardContent>
                <CardFooter className="flex justify-center items-center">
                    <Skeleton className="h-4 w-full" />
                </CardFooter>
            </Card>

            <Card className="w-full shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400">
                <CardHeader>
                </CardHeader>
                <CardContent className="flex justify-center items-center">
                    <Skeleton className="h-[252px] w-[250px] rounded-xl" />
                </CardContent>
                <CardFooter className="flex justify-center items-center">
                    <Skeleton className="h-4 w-full" />
                </CardFooter>
            </Card>

            <Card className="w-full shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400">
                <CardHeader>
                </CardHeader>
                <CardContent className="flex justify-center items-center">
                    <Skeleton className="h-[252px] w-[250px] rounded-xl" />
                </CardContent>
                <CardFooter className="flex justify-center items-center">
                    <Skeleton className="h-4 w-full" />
                </CardFooter>
            </Card>

            <Card className="w-full shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400">
                <CardHeader>
                </CardHeader>
                <CardContent className="flex justify-center items-center">
                    <Skeleton className="h-[252px] w-[250px] rounded-xl" />
                </CardContent>
                <CardFooter className="flex justify-center items-center">
                    <Skeleton className="h-4 w-full" />
                </CardFooter>
            </Card>

            <Card className="w-full shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400">
                <CardHeader>
                </CardHeader>
                <CardContent className="flex justify-center items-center">
                    <Skeleton className="h-[252px] w-[250px] rounded-xl" />
                </CardContent>
                <CardFooter className="flex justify-center items-center">
                    <Skeleton className="h-4 w-full" />
                </CardFooter>
            </Card>
        </Grid>

    )
}