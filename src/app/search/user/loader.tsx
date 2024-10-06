import { Skeleton } from "@/components/ui/skeleton";
import UserCard from "@/components/user-card";
import Grid from "@/components/grid";

export default function Loader() {
    return (
        <Grid>
            <UserCard id={'loader'} content={<Skeleton className="h-[125px] w-[250px] rounded-xl" />} footer={<Skeleton className="h-4 w-full" />} />
        </Grid>
    )
}