<?php

class ProductFactory
{
    public static function createProduct($data)
    {
        
         $product = new ProductOperation($data);

      
        $product->setSKU($data['SKU']);
        $product->setName($data['Name']);
        $product->setPrice($data['Price']);
        $product->setSize($data['Size']);
        $product->setWeight($data['Weight']);
        $product->setHeight($data['Height']);
        $product->setWidth($data['Width']);
        $product->setLength($data['Length']);

        return $product;
    }
}