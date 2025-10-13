"use client";

import type React from "react";

import { useState, useEffect } from "react";
import type { Product, productStatus } from "@/lib/types";
import { mockCategories } from "@/lib/mockData";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product | null;
  onSave: (product: Omit<Product, "id"> & { id?: number }) => void;
}

export function ProductFormModal({
  open,
  onOpenChange,
  product,
  onSave,
}: ProductFormModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    costPrice: "",
    salesPrice: "",
    stockMin: "",
    stockMax: "",
    currentStock: "",
    productStatus: "ACTIVE" as productStatus,
    category: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        costPrice: product.costPrice.toString(),
        salesPrice: product.salesPrice.toString(),
        stockMin: product.stockMin.toString(),
        stockMax: product.stockMax.toString(),
        currentStock: product.currentStock.toString(),
        productStatus: product.productStatus,
        category: product.category,
      });
    } else {
      setFormData({
        name: "",
        costPrice: "",
        salesPrice: "",
        stockMin: "",
        stockMax: "",
        currentStock: "",
        productStatus: "ACTIVE",
        category: "",
      });
    }
    setErrors({});
  }, [product, open]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.costPrice || Number.parseFloat(formData.costPrice) <= 0)
      newErrors.costPrice = "Valid cost price is required";
    if (!formData.salesPrice || Number.parseFloat(formData.salesPrice) <= 0)
      newErrors.salesPrice = "Valid sales price is required";
    if (!formData.stockMin || Number.parseInt(formData.stockMin) < 0)
      newErrors.stockMin = "Valid minimum stock is required";
    if (!formData.stockMax || Number.parseInt(formData.stockMax) <= 0)
      newErrors.stockMax = "Valid maximum stock is required";
    if (!formData.currentStock || Number.parseInt(formData.currentStock) < 0)
      newErrors.currentStock = "Valid current stock is required";
    if (!formData.category) newErrors.category = "Category is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      ...(product && { id: product.id }),
      name: formData.name,
      costPrice: Number.parseFloat(formData.costPrice),
      salesPrice: Number.parseFloat(formData.salesPrice),
      stockMin: Number.parseInt(formData.stockMin),
      stockMax: Number.parseInt(formData.stockMax),
      currentStock: Number.parseInt(formData.currentStock),
      productStatus: formData.productStatus,
      category: formData.category,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {product ? "Edit Product" : "Add New Product"}
          </DialogTitle>
          <DialogDescription>
            {product
              ? "Update the product information below."
              : "Fill in the details to create a new product."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">
                Product Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter product name"
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="costPrice">
                  Cost Price <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="costPrice"
                  type="number"
                  step="0.01"
                  value={formData.costPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, costPrice: e.target.value })
                  }
                  placeholder="0.00"
                />
                {errors.costPrice && (
                  <p className="text-sm text-destructive">{errors.costPrice}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="salesPrice">
                  Sales Price <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="salesPrice"
                  type="number"
                  step="0.01"
                  value={formData.salesPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, salesPrice: e.target.value })
                  }
                  placeholder="0.00"
                />
                {errors.salesPrice && (
                  <p className="text-sm text-destructive">
                    {errors.salesPrice}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="stockMin">
                  Min Stock <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="stockMin"
                  type="number"
                  value={formData.stockMin}
                  onChange={(e) =>
                    setFormData({ ...formData, stockMin: e.target.value })
                  }
                  placeholder="0"
                />
                {errors.stockMin && (
                  <p className="text-sm text-destructive">{errors.stockMin}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="stockMax">
                  Max Stock <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="stockMax"
                  type="number"
                  value={formData.stockMax}
                  onChange={(e) =>
                    setFormData({ ...formData, stockMax: e.target.value })
                  }
                  placeholder="0"
                />
                {errors.stockMax && (
                  <p className="text-sm text-destructive">{errors.stockMax}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="currentStock">
                  Current Stock <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="currentStock"
                  type="number"
                  value={formData.currentStock}
                  onChange={(e) =>
                    setFormData({ ...formData, currentStock: e.target.value })
                  }
                  placeholder="0"
                />
                {errors.currentStock && (
                  <p className="text-sm text-destructive">
                    {errors.currentStock}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category">
                  Category <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value: any) =>
                    setFormData({ ...formData, category: value })
                  }
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-sm text-destructive">{errors.category}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="productStatus">productStatus</Label>
                <Select
                  value={formData.productStatus}
                  onValueChange={(value: productStatus) =>
                    setFormData({ ...formData, productStatus: value })
                  }
                >
                  <SelectTrigger id="productStatus">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {product ? "Update" : "Create"} Product
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
