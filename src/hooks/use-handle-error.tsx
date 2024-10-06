import { useToast } from "./use-toast";
import { useTransitionRouter } from "next-view-transitions";

export default function useHandleError() {
    const { toast } = useToast();
    const router = useTransitionRouter();

    const showErrorMessage = (message: string) => {
        toast({
            variant: "destructive",
            title: "An Error Occurred",
            description: message,
        });
    }

    const handleError = async (error: unknown, redirect: boolean = true) => {

        if (error instanceof Error) {

            if (error.message === 'Issues are disabled for this repo') { //error message not show in prod
                toast({
                    variant: "destructive",
                    title: "An Error Occurred",
                    description: "Issues are disabled for this repo",
                });

            } else {
                toast({
                    variant: "destructive",
                    title: "An Error Occurred",
                    description: error.message,
                });
            }


        } else {
            toast({
                variant: "destructive",
                title: "Unknown Error",
                description: "Something went wrong!",
            });
        }

        console.error("Error details:", error);
        if (redirect) {
            router.push('/error')
        }

        return false;
    };


    return { showErrorMessage, handleError };
}