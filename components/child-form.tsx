"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { addDays } from "date-fns"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { CldImage, CldUploadButton } from 'next-cloudinary';
import "./child-form.css";
// import { format } from "date-fns";
// import { cn } from "@/lib/utils";
import * as React from "react";
import DeleteChildDialog from "@/app/dashboard/children/[childId]/delete-child-dialog";
import Image from "next/image";
import placeholder from "@/public/placeholder-image.jpg";
const cloudPresetName = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;

export const childFormSchema = z.object({
    childGender: z.enum(["male", "female"]),
    dateOfBirth: z.coerce.date().max(addDays(new Date(), 1)),
    height: z.string(),
    weight: z.coerce.number().positive(),
    eyeColor: z.string(),
    hairColor: z.string(),
    identifiers: z.string(),
    medicalConditions: z.string(),
    imageUrl: z.string(),
    race: z.enum(["American Indian or Alaska Native", "Asian", "Black or African American", "Hispanic or Latino", "Middle Eastern or North African", "Native Hawaiian or Pacific Islander", "White"])
});

type Props = {
    onSubmit: (data: z.infer<typeof childFormSchema>) => Promise<void>;
    id?: any;
    defaultValues?: {
        childGender: "male" | "female",
        dateOfBirth: Date,
        height: string,
        weight: number,
        eyeColor: string,
        hairColor: string,
        identifiers: string,
        medicalConditions: string,
        imageUrl: string,
        race: "American Indian or Alaska Native" | "Asian" | "Black or African American" | "Hispanic or Latino" | "Middle Eastern or North African" | "Native Hawaiian or Pacific Islander" | "White"
    }
}

export default function ChildForm({
    onSubmit, defaultValues, id
}: Props) {
    const form = useForm<z.infer<typeof childFormSchema>>({
        resolver: zodResolver(childFormSchema),
        defaultValues: {
            childGender: "male",
            dateOfBirth: new Date(),
            height: "",
            weight: 0,
            eyeColor: "",
            hairColor: "",
            identifiers: "",
            medicalConditions: "",
            imageUrl: "",
            race: "White",
            ...defaultValues,
        }
    });

    const handleSubmit = async (data: z.infer<typeof childFormSchema>) => {
        onSubmit(data.getValues());
    };

   function	onclick(event: any) {
        debugger;
   }

    const [open, setOpen] = React.useState(false)
    const [img, setImg] = React.useState(null);;

    return (
        <Form {...form}>
            <form onSubmit={() => handleSubmit(form)} style={{ display: 'inline-flex' }}>
                <fieldset disabled={form.formState.isSubmitting} className="mt-5 mb-5 flex flex-col gap-5">
                    <FormField control={form.control} name="imageUrl" render={({ field }) => {
                        return (
                            <div>
                                {!img ? 
                                <Image src={placeholder} alt="placeholder" className="border border-solid border-black mb-5" /> :
                                <CldImage
                                    src="https://res.cloudinary.com/dgxm6nzpd/image/upload/v1755136373/Nate_in_hoodie2_apmpjy.jpg"
                                    width="320" height="500" alt="Nate" />}
                                <CldUploadButton onUpload={onclick} uploadPreset={cloudPresetName} className={'uploadImgBtn'}>
                                    {({ open }) => {
                                        return <button onClick={open}>Upload Image</button>;
                                    }}
                                </CldUploadButton>
                            </div>
                        )
                    }} />
                </fieldset>
                <div style={{ paddingLeft: '20px' }}>
                    <fieldset disabled={form.formState.isSubmitting} className="grid grid-cols-2 gap-y-5 gap-x-2">
                        <FormField control={form.control} name="race" render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>Race</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="native">American Indian or Alaska Native</SelectItem>
                                                <SelectItem value="asian">Asian</SelectItem>
                                                <SelectItem value="black">Black or African American</SelectItem>
                                                <SelectItem value="hispanic">Hispanic or Latino</SelectItem>
                                                <SelectItem value="african">Middle Eastern or North African</SelectItem>
                                                <SelectItem value="pacific">Native Hawaiian or Pacific Islander</SelectItem>
                                                <SelectItem value="White">White</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )
                        }} />
                        <FormField control={form.control} name="dateOfBirth" render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>Date Of Birth</FormLabel>
                                    <FormControl>
                                        <Popover open={open} onOpenChange={setOpen}>
                                            <PopoverTrigger asChild>
                                                <Button variant="outline" id="date" className="w-full justify-between font-normal">
                                                    {field.value ? field.value.toLocaleDateString() : "Select date"}
                                                    <ChevronDownIcon />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    captionLayout="dropdown"
                                                    onSelect={field.onChange}
                                                    disabled={{
                                                        after: new Date(),

                                                    }}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )
                        }} />
                        <FormField control={form.control} name="height" render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>Height</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value} emptyText={"select one"}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="0-1">0 feet 1 inch</SelectItem>
                                                <SelectItem value="0-2">0 feet 2 inches</SelectItem>
                                                <SelectItem value="0-3">0 feet 3 inches</SelectItem>
                                                <SelectItem value="0-4">0 feet 4 inches</SelectItem>
                                                <SelectItem value="0-5">0 feet 5 inches</SelectItem>
                                                <SelectItem value="0-6">0 feet 6 inches</SelectItem>
                                                <SelectItem value="0-7">0 feet 7 inches</SelectItem>
                                                <SelectItem value="0-8">0 feet 8 inches</SelectItem>
                                                <SelectItem value="0-9">0 feet 9 inches</SelectItem>
                                                <SelectItem value="0-10">0 feet 10 inches</SelectItem>
                                                <SelectItem value="0-11">0 feet 11 inches</SelectItem>
                                                <SelectItem value="1-0">1 feet 0 inches</SelectItem>
                                                <SelectItem value="1-1">1 feet 1 inches</SelectItem>
                                                <SelectItem value="1-2">1 feet 2 inches</SelectItem>
                                                <SelectItem value="1-3">1 feet 3 inches</SelectItem>
                                                <SelectItem value="1-4">1 feet 4 inches</SelectItem>
                                                <SelectItem value="1-5">1 feet 5 inches</SelectItem>
                                                <SelectItem value="1-6">1 feet 6 inches</SelectItem>
                                                <SelectItem value="1-7">1 feet 7 inches</SelectItem>
                                                <SelectItem value="1-8">1 feet 8 inches</SelectItem>
                                                <SelectItem value="1-9">1 feet 9 inches</SelectItem>
                                                <SelectItem value="1-10">1 feet 10 inches</SelectItem>
                                                <SelectItem value="1-11">1 feet 11 inches</SelectItem>
                                                <SelectItem value="2-0">2 feet 0 inches</SelectItem>
                                                <SelectItem value="2-1">2 feet 1 inches</SelectItem>
                                                <SelectItem value="2-2">2 feet 2 inches</SelectItem>
                                                <SelectItem value="2-3">2 feet 3 inches</SelectItem>
                                                <SelectItem value="2-4">2 feet 4 inches</SelectItem>
                                                <SelectItem value="2-5">2 feet 5 inches</SelectItem>
                                                <SelectItem value="2-6">2 feet 6 inches</SelectItem>
                                                <SelectItem value="2-7">2 feet 7 inches</SelectItem>
                                                <SelectItem value="2-8">2 feet 8 inches</SelectItem>
                                                <SelectItem value="2-9">2 feet 9 inches</SelectItem>
                                                <SelectItem value="2-10">2 feet 10 inches</SelectItem>
                                                <SelectItem value="2-11">2 feet 11 inches</SelectItem>
                                                <SelectItem value="3-0">3 feet 0 inches</SelectItem>
                                                <SelectItem value="3-1">3 feet 1 inches</SelectItem>
                                                <SelectItem value="3-2">3 feet 2 inches</SelectItem>
                                                <SelectItem value="3-3">3 feet 3 inches</SelectItem>
                                                <SelectItem value="3-4">3 feet 4 inches</SelectItem>
                                                <SelectItem value="3-5">3 feet 5 inches</SelectItem>
                                                <SelectItem value="3-6">3 feet 6 inches</SelectItem>
                                                <SelectItem value="3-7">3 feet 7 inches</SelectItem>
                                                <SelectItem value="3-8">3 feet 8 inches</SelectItem>
                                                <SelectItem value="3-9">3 feet 9 inches</SelectItem>
                                                <SelectItem value="3-10">3 feet 10 inches</SelectItem>
                                                <SelectItem value="3-11">3 feet 11 inches</SelectItem>
                                                <SelectItem value="4-0">4 feet 0 inches</SelectItem>
                                                <SelectItem value="4-1">4 feet 1 inches</SelectItem>
                                                <SelectItem value="4-2">4 feet 2 inches</SelectItem>
                                                <SelectItem value="4-3">4 feet 3 inches</SelectItem>
                                                <SelectItem value="4-4">4 feet 4 inches</SelectItem>
                                                <SelectItem value="4-5">4 feet 5 inches</SelectItem>
                                                <SelectItem value="4-6">4 feet 6 inches</SelectItem>
                                                <SelectItem value="4-7">4 feet 7 inches</SelectItem>
                                                <SelectItem value="4-8">4 feet 8 inches</SelectItem>
                                                <SelectItem value="4-9">4 feet 9 inches</SelectItem>
                                                <SelectItem value="4-10">4 feet 10 inches</SelectItem>
                                                <SelectItem value="4-11">4 feet 11 inches</SelectItem>
                                                <SelectItem value="5-0">5 feet 0 inches</SelectItem>
                                                <SelectItem value="5-1">5 feet 1 inches</SelectItem>
                                                <SelectItem value="5-2">5 feet 2 inches</SelectItem>
                                                <SelectItem value="5-3">5 feet 3 inches</SelectItem>
                                                <SelectItem value="5-4">5 feet 4 inches</SelectItem>
                                                <SelectItem value="5-5">5 feet 5 inches</SelectItem>
                                                <SelectItem value="5-6">5 feet 6 inches</SelectItem>
                                                <SelectItem value="5-7">5 feet 7 inches</SelectItem>
                                                <SelectItem value="5-8">5 feet 8 inches</SelectItem>
                                                <SelectItem value="5-9">5 feet 9 inches</SelectItem>
                                                <SelectItem value="5-10">5 feet 10 inches</SelectItem>
                                                <SelectItem value="5-11">5 feet 11 inches</SelectItem>
                                                <SelectItem value="6-0">6 feet 0 inches</SelectItem>
                                                <SelectItem value="6-1">6 feet 1 inches</SelectItem>
                                                <SelectItem value="6-2">6 feet 2 inches</SelectItem>
                                                <SelectItem value="6-3">6 feet 3 inches</SelectItem>
                                                <SelectItem value="6-4">6 feet 4 inches</SelectItem>
                                                <SelectItem value="6-5">6 feet 5 inches</SelectItem>
                                                <SelectItem value="6-6">6 feet 6 inches</SelectItem>
                                                <SelectItem value="6-7">6 feet 7 inches</SelectItem>
                                                <SelectItem value="6-8">6 feet 8 inches</SelectItem>
                                                <SelectItem value="6-9">6 feet 9 inches</SelectItem>
                                                <SelectItem value="6-10">6 feet 10 inches</SelectItem>
                                                <SelectItem value="6-11">6 feet 11 inches</SelectItem>
                                                <SelectItem value="7-0">7 feet 0 inches</SelectItem>
                                                <SelectItem value="7-1">7 feet 1 inches</SelectItem>
                                                <SelectItem value="7-2">7 feet 2 inches</SelectItem>
                                                <SelectItem value="7-3">7 feet 3 inches</SelectItem>
                                                <SelectItem value="7-4">7 feet 4 inches</SelectItem>
                                                <SelectItem value="7-5">7 feet 5 inches</SelectItem>
                                                <SelectItem value="7-6">7 feet 6 inches</SelectItem>
                                                <SelectItem value="7-7">7 feet 7 inches</SelectItem>
                                                <SelectItem value="7-8">7 feet 8 inches</SelectItem>
                                                <SelectItem value="7-9">7 feet 9 inches</SelectItem>
                                                <SelectItem value="7-10">7 feet 10 inches</SelectItem>
                                                <SelectItem value="7-11">7 feet 11 inches</SelectItem>
                                                <SelectItem value="8-0">8 feet 0 inches</SelectItem>
                                                <SelectItem value="8-1">8 feet 1 inches</SelectItem>
                                                <SelectItem value="8-2">8 feet 2 inches</SelectItem>
                                                <SelectItem value="8-3">8 feet 3 inches</SelectItem>
                                                <SelectItem value="8-4">8 feet 4 inches</SelectItem>
                                                <SelectItem value="8-5">8 feet 5 inches</SelectItem>
                                                <SelectItem value="8-6">8 feet 6 inches</SelectItem>
                                                <SelectItem value="8-7">8 feet 7 inches</SelectItem>
                                                <SelectItem value="8-8">8 feet 8 inches</SelectItem>
                                                <SelectItem value="8-9">8 feet 9 inches</SelectItem>
                                                <SelectItem value="8-10">8 feet 10 inches</SelectItem>
                                                <SelectItem value="8-11">8 feet 11 inches</SelectItem>
                                                <SelectItem value="9-0">9 feet 0 inches</SelectItem>
                                                <SelectItem value="9-1">9 feet 1 inches</SelectItem>
                                                <SelectItem value="9-2">9 feet 2 inches</SelectItem>
                                                <SelectItem value="9-3">9 feet 3 inches</SelectItem>
                                                <SelectItem value="9-4">9 feet 4 inches</SelectItem>
                                                <SelectItem value="9-5">9 feet 5 inches</SelectItem>
                                                <SelectItem value="9-6">9 feet 6 inches</SelectItem>
                                                <SelectItem value="9-7">9 feet 7 inches</SelectItem>
                                                <SelectItem value="9-8">9 feet 8 inches</SelectItem>
                                                <SelectItem value="9-9">9 feet 9 inches</SelectItem>
                                                <SelectItem value="9-10">9 feet 10 inches</SelectItem>
                                                <SelectItem value="9-11">9 feet 11 inches</SelectItem>
                                                <SelectItem value="10-0">10 feet 0 inches</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )
                        }} />
                        <FormField control={form.control} name="weight" render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>Weight (lb)</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="number" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )
                        }} />
                        <FormField control={form.control} name="eyeColor" render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>Eye Color</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )
                        }} />
                        <FormField control={form.control} name="hairColor" render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>Hair Color</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )
                        }} />
                        <FormField control={form.control} name="identifiers" render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>Identifying Characteristics</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )
                        }} />
                        <FormField control={form.control} name="medicalConditions" render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>Medical Conditions</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )
                        }} />
                    </fieldset>
                    <fieldset disabled={form.formState.isSubmitting} className="mt-5 mb-5 flex flex-col gap-5">
                        <FormField control={form.control} name="childGender" render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>Gender</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="male">Male</SelectItem>
                                                <SelectItem value="female">Female</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )
                        }} />
                        <div style={{display: 'inline-flex', gap: '7px'}}>
                            <Button variant="outline" size="icon" aria-label="Submit"
                                style={{ width: '100px', background: 'midnightblue', color: 'ghostwhite', cursor: 'pointer', marginLeft: '280px' }}>
                                Submit
                            </Button>
                            {id ? <DeleteChildDialog childId={id} type={'button'}/> : null}
                        </div>
                    </fieldset>
                </div>
            </form>
        </Form>
    )
}