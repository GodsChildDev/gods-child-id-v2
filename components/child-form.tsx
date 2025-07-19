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
// import { format } from "date-fns";
// import { cn } from "@/lib/utils";
import * as React from "react";

export const childFormSchema = z.object({
    childGender: z.enum(["male", "female"]),
    childAge: z.coerce.number().positive(),
    dateOfBirth: z.coerce.date().max(addDays(new Date(), 1)),
    height: z.string(),
    weight: z.coerce.number().positive(),
    eyeColor: z.string(),
    hairColor: z.string(),
    identifiers: z.string(),
    medicalConditions: z.string(),
});

type Props ={
    onSubmit: (data: z.infer<typeof childFormSchema>) => Promise<void>;
    defaultValues?: {
        childGender: "male" | "female",
        childAge: number,
        dateOfBirth: Date,
        height: string,
        weight: number,
        eyeColor: string,
        hairColor: string,
        identifiers: string,
        medicalConditions: string
    }
}

export default function ChildForm({
    onSubmit, defaultValues
}: Props) {
    const form = useForm<z.infer<typeof childFormSchema>>({
        resolver: zodResolver(childFormSchema),
        defaultValues: {
            childGender: "male",
            childAge: 0,
            dateOfBirth: new Date(),
            height: "",
            weight: 0,
            eyeColor: "",
            hairColor: "",
            identifiers: "",
            medicalConditions: "",
            ...defaultValues,
        }
    });

    // const handleSubmit = async (data: z.infer<typeof childFormSchema>) => {
    //     onSubmit(data);
    // };

    const [open, setOpen] = React.useState(false)
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <fieldset disabled={form.formState.isSubmitting} className="grid grid-cols-2 gap-y-5 gap-x-2">
                <FormField control={form.control} name="childAge" render={({field}) => {
                    return (
                    <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                            <Input {...field} type="number" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )
                }} />
                <FormField control={form.control} name="dateOfBirth" render={({field}) => {
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
                <FormField control={form.control} name="height" render={({field}) => {
                    return (
                    <FormItem>
                        <FormLabel>Height</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )
                }} />
                <FormField control={form.control} name="weight" render={({field}) => {
                    return (
                    <FormItem>
                        <FormLabel>Weight</FormLabel>
                        <FormControl>
                            <Input {...field} type="number" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )
                }} />
                <FormField control={form.control} name="eyeColor" render={({field}) => {
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
                <FormField control={form.control} name="hairColor" render={({field}) => {
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
                 <FormField control={form.control} name="identifiers" render={({field}) => {
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
                <FormField control={form.control} name="medicalConditions" render={({field}) => {
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
                    <FormField control={form.control} name="childGender" render={({field}) => {
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
                <Button type="submit">Submit</Button>
                </fieldset>
            </form>
        </Form>
    )
}