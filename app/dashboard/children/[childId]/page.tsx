import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EditChildForm from "./edit-child-form";
import { getChild } from "@/data/getChild";
import { notFound } from "next/navigation";
import DeleteChildDialog from "./delete-child-dialog";
import Image from "next/image";
import tree from "@/public/tree-drawing.png";
import './child-edit.css';
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Link from "@/node_modules/next/link";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export default async function EditChildPage({ params }: {
    params: Promise<{ childId: string }>
}) {
    const paramsValues = await params;
    const childId = Number(paramsValues.childId);

    if (isNaN(childId)) {
        notFound();
    }

    const child = await getChild(childId);
    if (!child) {
        notFound();
    }

    const images = await cloudinary.search
    .expression('asset_folder:Gods_child')
    .sort_by('created_at', 'desc')
    .max_results(1)
    .execute();

    console.log(images.resources);

    return (
        <div style={{display: 'inline-flex'}}>
            <Card className="mt-4 max-w-screen-md" style={{ background: 'lightyellow' }}>
                <CardHeader>
                    <CardTitle className="flex justify-between">
                        <span>EDIT CHILD</span>
                        <Button size="icon" style={{background: 'transparent', color: 'black', cursor: 'pointer'}} asChild aria-label="Close">
                            <Link href="/dashboard/children">
                                <X />
                            </Link>
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <EditChildForm child={child} />
                </CardContent>
            </Card>
            <Image src={tree} alt="call" width={520} height={600} quality={100} 
                className={'treeBox'} />
        </div>
    )
}