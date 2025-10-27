"use client";

import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2Icon, X } from "lucide-react";
import { deleteChild } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function DeleteChildDialog({
    childId, type
}: {
    childId: number;
    type?: string;
}) {

    const router = useRouter()

    const handleDeleteConfirm = async () => {
        const result = await deleteChild(childId);

        if (result?.error) {
            toast.error(`Error deleting child: ${result.message}`)
            return;
        }

        toast.success("Child deleted successfully!")
        router.push("/dashboard/children");
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {type === 'button' ?
                    <Button variant="outline" size="icon" aria-label="Delete"
                        style={{ width: '100px', background: 'transparent', color: 'red', border: 'thin solid red', cursor: 'pointer' }}>
                        Delete
                    </Button> :
                    type === 'x' ?
                    <Button variant="outline" size="icon" aria-label="Delete" style={{cursor: 'pointer'}}>
                        <X />
                    </Button> :
                    <Button variant="destructive" size="icon">
                        <Trash2Icon />
                    </Button>
                }
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to delete this child record?</AlertDialogTitle>
                    <AlertDialogDescription>This action cannot be undone. This child will be permanently deleted from your account.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button onClick={handleDeleteConfirm} variant="destructive">Delete</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}