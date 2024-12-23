import { z } from "zod";
export declare const SignUpSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    password: string;
}, {
    name: string;
    email: string;
    password: string;
}>;
export declare const AddressSchema: z.ZodObject<{
    lineOne: z.ZodString;
    lineTwo: z.ZodNullable<z.ZodString>;
    city: z.ZodString;
    pincode: z.ZodString;
    country: z.ZodString;
}, "strip", z.ZodTypeAny, {
    lineOne: string;
    lineTwo: string | null;
    city: string;
    pincode: string;
    country: string;
}, {
    lineOne: string;
    lineTwo: string | null;
    city: string;
    pincode: string;
    country: string;
}>;
export declare const UpdateUserSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    defaultShippingAddress: z.ZodOptional<z.ZodNumber>;
    defaultBillingAddress: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    defaultShippingAddress?: number | undefined;
    defaultBillingAddress?: number | undefined;
}, {
    name?: string | undefined;
    defaultShippingAddress?: number | undefined;
    defaultBillingAddress?: number | undefined;
}>;
