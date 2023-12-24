<?php
include_once 'DbConnect.php';
 abstract class Product
{
    protected $SKU;
    protected $Name;
    protected $Price;
    protected $Size;
    protected $Weight;
    protected $Height;
    protected $Width;
    protected $Length;
    
    
    public function setSKU($SKU)
    {
        $this->SKU = $SKU;
    }

    public function getSKU()
    {
        return $this->SKU;
    }
    
    
    
    public function setName($Name)
    {
        $this->Name = $Name;
    }

    public function getName()
    {
        return $this->Name;
    }
    
    
    
    
    public function setPrice($Price)
    {
        $this->Price = $Price;
    }

    public function getPrice()
    {
        return $this->Price;
    }
    
    
    
    
    public function setSize($Size)
    {
        $this->Size = $Size;
    }

    public function getSize()
    {
        return $this->Size;
    }
    
    
    
    
    public function setWeight($Weight)
    {
        $this->Weight = $Weight;
    }

    public function getWeight()
    {
        return $this->Weight;
    }




    public function setHeight($Height)
    {
        $this->Height = $Height;
    }

    public function getHeight()
    {
        return $this->Height;
    }
    
    
    
    
    public function setWidth($Width)
    {
        $this->Width = $Width;
    }

    public function getWidth()
    {
        return $this->Width;
    }
    
    
    
    
    public function setLength($Length)
    {
        $this->Length = $Length;
    }

    public function getLength()
    {
        return $this->Length;
    }
    
    


    abstract public function save(PDO $conn);
}