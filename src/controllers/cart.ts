import { Request, Response } from "express";
import { ChangeQuantitySchema, CreateCartSchema } from "@schema/cart";
import { Product } from "@prisma/client";
import { prismaClient } from "..";
import { NotFoundException, ErrorCode } from "@validators/GlobalValidator";

export const addItemToCart= async (req:Request, res:Response) =>{
    const validatedData = CreateCartSchema.parse(req.body)
    let product: Product
    if(validatedData.productId){
        try{
            product = await prismaClient.product.findFirstOrThrow({
                where:{
                    id: validatedData.productId
                }
            })
        }catch(error){
            throw new NotFoundException('Product not found', ErrorCode.PRODUCT_NOT_FOUND)
        }
        const cart = await prismaClient.cartItem.create({
            data:{
                userId:req.user.id,
                productId:product.id,
                quantity: validatedData.quantity
            }
        })
        res.json(cart)    
    }   
}

export const deletetemFromCart= async (req:Request, res:Response) =>{
    await prismaClient.cartItem.delete({
        where:{
            id:+req.params.id
        }
    })
    res.json({success:true})
}

export const changeQuantity= async (req:Request, res:Response) =>{
    const validatedData = ChangeQuantitySchema.parse(req.body)
    const updatedCart = await prismaClient.cartItem.update({
        where:{
            id: +req.params.id
        },
        data:{
            quantity: validatedData.quantity
        }
    })
    res.json(updatedCart)
}

export const getCart= async (req:Request, res:Response) =>{
    const cart = await prismaClient.cartItem.findMany({
        where:{
            userId:req.user.id
        },
        include:{
            product:true
        }
    })
    res.json(cart)
}

export const cartItemsCount = async (req: Request, res: Response) => { 
    const cartCount = await prismaClient.cartItem.count({
        where: {
            userId:req.user.id
        }
    })
    res.json({ count: cartCount });
}