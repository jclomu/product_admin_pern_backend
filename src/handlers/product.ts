import { Request, Response } from "express"
import Product from "../models/Product.model"

export const createProduct = async (req: Request, res: Response) => {
    const product = await Product.create(req.body)
    res.status(201).json({ data: product })
}

export const getProducts = async (req: Request, res: Response) => {
    const products = await Product.findAll({
        order: [
            ['name', 'DESC']
        ],
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    })
    res.json({ data: products })
}

export const getProductById = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id, { attributes: { exclude: ['createdAt', 'updatedAt'] } })

    if (!product) {
        return res.status(404).json({
            error: 'Product Not Found'
        })
    }

    res.json({ data: product })
}

export const updateProduct = async (req: Request, res: Response) => {

    // Get Product By Id
    const { id } = req.params
    const product = await Product.findByPk(id, { attributes: { exclude: ['createdAt', 'updatedAt'] } })

    if (!product) {
        return res.status(404).json({
            error: 'Product Not Found'
        })
    }

    //Update Product
    await product.update(req.body)
    await product.save()

    res.json({ data: product })
}

export const updateAvailability = async (req: Request, res: Response) => {

    // Get Product By Id
    const { id } = req.params
    const product = await Product.findByPk(id, { attributes: { exclude: ['createdAt', 'updatedAt'] } })

    if (!product) {
        return res.status(404).json({
            error: 'Product Not Found'
        })
    }

    //Update Product
    product.availability = !product.dataValues.availability
    await product.save()

    res.json({ data: product })
}

export const deleteProduct = async (req: Request, res: Response) => {

    // Get Product By Id
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
        return res.status(404).json({
            error: 'Product Not Found'
        })
    }

    // //Delete Product
    await product.destroy()
    res.json({ data: "product deleted" })
}
