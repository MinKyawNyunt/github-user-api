'use client'

import Image from "next/image"
import NoDataImage from "../static/images/2953962.jpg"

export default function NoData() {

    return (
        <div className='flex flex-col justify-center items-center'>
            <Image src={NoDataImage} alt="no-data" width={400} height={400} />
            {/* <Button onClick={() => router.back()}>Back</Button> */}
        </div>
    )
}