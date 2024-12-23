import { Request, Response } from 'express';
import { prismaClient } from '..';
import { NotFoundException, ErrorCode } from '@validators/GlobalValidator';

export const createOrder = async(req:Request, res:Response) =>{
/*

Create a transaction
List all items in the cart and proceed only if cart is not empty
Calculate the total amount
Fetch address of the user
To define computed field for formatted address on address module
Create an order 
Create the order event

*/
    return await prismaClient.$transaction(async(tx) =>{
        const cartItems = await tx.cartItem.findMany({
            where:{
                userId:req.user.id
            },
            include:{
                product:true
            }
        })
       
        if(cartItems.length == 0){
            return res.json({message: "Cart is empty"})
        }

        const price = cartItems.reduce((prev,current)=>{
            return prev + (current.quantity * +current.product.price)
        },0)
      
        const address = await tx.address.findFirst({
            where: {
                id:req.user.defaultShippingAddress
            }
        })
      
        if (!address) {
            throw new Error("Default shipping address not found.");
        }
            const order = await tx.order.create({
                data:{
                    userId: req.user.id, 
                    netAmount: price ,
                    address: address.formattedAddress  ,
                    products: {
                        create: cartItems.map((cart)=> {
                            return {
                                productId: cart.productId,
                                quantity: cart.quantity
                            } 
                        })
                    } 
                }
            })

            const orderEvent = await tx.orderEvent.create({
                data:{
                    orderId: order.id,
                }
            })
            await tx.cartItem.deleteMany({
                where:{
                    userId: req.user.id
                }
            })
            return res.json(order);

    })  
}

export const listOrders = async(req:Request, res:Response) =>{
    const orders = await prismaClient.order.findMany({
        where:{
            userId: req.user.id
        },
    })
    res.json(orders)
}

export const cancelOrder = async(req:Request, res:Response) =>{
    try{
        const order = await prismaClient.order.update({
            where:{
                id: +req.params.id
            },
            data:{
                status: 'CANCELLED'
            }
        })
        await prismaClient.orderEvent.create({
            data:{
                orderId: order.id,
                status: "CANCELLED"
            } as any
        })
        res.json(order)
    }catch(err){
        throw new NotFoundException('Order not found', ErrorCode.ORDER_NOT_FOUND)
    }
}

export const getOrderById = async(req:Request, res:Response) =>{
    try{
        const order = await prismaClient.order.findFirstOrThrow({
            where:{
                id: +req.params.id
            },
            include: {
                products:true,
                events:true
            }
        })
        res.json(order)
    }catch(err){
        throw new NotFoundException('Order not found', ErrorCode.ORDER_NOT_FOUND)
    }
}

export const listAllOrders = async(req: Request, res: Response) => {
    let whereClause = {

    }
    const status = req.params.status
    if(status){
        whereClause ={
            status
        }
    }
    const orders = await prismaClient.order.findMany({
        where: whereClause,
        skip: 0,
        take: 5
    })
    res.json(orders)
}

export const changeStatus = async(req: Request, res: Response) => {
    try{
        const order = await prismaClient.order.update({
            where:{
                id: +req.params.id
            },
            data:{
                status: req.body.status
            }
        })
        res.json(order)
        await prismaClient.orderEvent.create({
            data:{
                orderId: order.id,
                status: req.body.status
            } as any
        })

    }catch(err){
        throw new NotFoundException('Order not found', ErrorCode.ORDER_NOT_FOUND)
    }
}

export const listUserOrders = async(req: Request, res: Response) => {
    try{
        let whereClause ={
            user: +req.params.id
        }
        const status = req.query.status
        if(status){
            whereClause ={
                ...whereClause,
                status
            } as any
        }

    }catch(err){
        throw new NotFoundException('Order not found', ErrorCode.ORDER_NOT_FOUND)
    }
}