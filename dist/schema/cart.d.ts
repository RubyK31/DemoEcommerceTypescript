import { z } from "zod";
export declare const CreateCartSchema: z.ZodObject<{
    productId: z.ZodNumber;
    quantity: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    quantity: number;
    productId: number;
}, {
    quantity: number;
    productId: number;
}>;
export declare const ChangeQuantitySchema: z.ZodObject<{
    quantity: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    quantity: number;
}, {
    quantity: number;
}>;
