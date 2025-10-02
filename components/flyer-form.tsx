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

export const flyerFormSchema = z.object({
    childName: z.string(),
    lastSeenAt: z.string(),
    lastSeenWearing: z.string(),
    lawEnforcementId: z.string(),
    parentName: z.string(),
    parentPhone: z.string(),
    emergencyName: z.string(),
    emergencyType: z.string(),
    emergencyPhone: z.string()
})

// child_id
// law_enforcement_id
// encrypted_name
// last_seen_at
// last_seen_wearing
// parent_phone
// emergency_phone
// parent_name
// emergency_name
// emergency_type
// child_name

type Props = {
    onSubmit: (data: z.infer<typeof flyerFormSchema>) => Promise<void>;
    defaultValues?: {
        childName: string,
        lastSeenAt: string,
        lastSeenWearing: string,
        lawEnforcementId: string
    }
}

function generateRandomAlphanumeric() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const minLength = 4;
    const maxLength = 6;
    const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    console.log('JDH code: ' + result);
    return result;
  };

export default function FlyerForm({
    onSubmit, defaultValues
}: Props) {
    const form = useForm<z.infer<typeof flyerFormSchema>>({
        resolver: zodResolver(flyerFormSchema),
        defaultValues: {
            ...defaultValues,
        }
    });

    form.setValue('lawEnforcementId', generateRandomAlphanumeric());

    // const handleSubmit = async (data: z.infer<typeof childFormSchema>) => {
    //     onSubmit(data);
    // };

    const [open, setOpen] = React.useState(false)
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <fieldset disabled={form.formState.isSubmitting} className="grid grid-cols-2 gap-y-5 gap-x-2">
                <FormField control={form.control} name="childName" render={({field}) => {
                    return (
                    <FormItem>
                        <FormLabel>Child Name</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )
                }} />
                <FormField control={form.control} name="lawEnforcementId" render={({field}) => {
                    return (
                    <FormItem>
                        <FormLabel>Law Enforcement Code</FormLabel>
                        <FormControl>
                            <Input {...field} disabled={true} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )
                }} />
                <FormField control={form.control} name="lastSeenWearing" render={({field}) => {
                    return (
                    <FormItem>
                        <FormLabel>Last Seen Wearing</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )
                }} />
                <FormField control={form.control} name="lastSeenAt" render={({field}) => {
                    return (
                    <FormItem>
                        <FormLabel>Last Seen At</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )
                }} />
                <FormField control={form.control} name="isMissing" render={({field}) => {
                    return (
                    <FormItem style={{display: 'flex', height: 'fit-content', alignItems: 'center'}}>
                        <FormLabel>Missing</FormLabel>
                        <FormControl style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                            <Input type={"checkbox"} {...field} 
                             style={{marginTop: '15px', transform: 'scale(0.65)'}}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )
                }} />
                <FormField control={form.control} name="isAbducted" render={({field}) => {
                    return (
                    <FormItem style={{display: 'flex', height: 'fit-content', alignItems: 'center'}}>
                        <FormLabel>Abducted</FormLabel>
                        <FormControl style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                            <Input type={"checkbox"} {...field} 
                            style={{marginTop: '15px', transform: 'scale(0.65)'}} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )
                }} />
                <span>Emergency Info</span><br/>
                <FormField control={form.control} name="parentName" render={({field}) => {
                    return (
                    <FormItem>
                        <FormLabel>Parent Name</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )
                }} />
                <FormField control={form.control} name="emergencyName" render={({field}) => {
                    return (
                    <FormItem>
                        <FormLabel>2nd Contact Name</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )
                }} />
                 <FormField control={form.control} name="parentPhone" render={({field}) => {
                    return (
                    <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )
                }} />
                <FormField control={form.control} name="emergencyType" render={({field}) => {
                    return (
                    <FormItem>
                        <FormLabel>Relationship</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )
                }} />
                <h1>_</h1>
                <FormField control={form.control} name="emergencyPhone" render={({field}) => {
                    return (
                    <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )
                }} />
                </fieldset>
                <fieldset disabled={form.formState.isSubmitting} className="mt-5 mb-5 flex flex-col gap-5">
                <Button type="submit">Submit</Button>
                </fieldset>
            </form>
        </Form>
    )
}