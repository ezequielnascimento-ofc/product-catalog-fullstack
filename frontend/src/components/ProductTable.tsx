import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit2, Trash2 } from "lucide-react";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export function ProductTable({
  products,
  onEdit,
  onDelete,
}: ProductTableProps) {
  const getStockStatus = (product: Product) => {
    if (product.currentStock <= product.stockMin) {
      return { label: "Low Stock", variant: "destructive" as const };
    }
    if (product.currentStock >= product.stockMax) {
      return { label: "Overstocked", variant: "secondary" as const };
    }
    return { label: "Normal", variant: "default" as const };
  };

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                Product Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                Category
              </th>
              <th className="px-6 py-4 text-right text-sm font-medium text-muted-foreground">
                Cost Price
              </th>
              <th className="px-6 py-4 text-right text-sm font-medium text-muted-foreground">
                Sales Price
              </th>
              <th className="px-6 py-4 text-center text-sm font-medium text-muted-foreground">
                Stock
              </th>
              <th className="px-6 py-4 text-center text-sm font-medium text-muted-foreground">
                Status
              </th>
              <th className="px-6 py-4 text-right text-sm font-medium text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.map((product) => {
              const stockStatus = getStockStatus(product);
              return (
                <tr
                  key={product.id}
                  className="hover:bg-accent/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-foreground">
                      {product.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-muted-foreground">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm text-muted-foreground font-mono">
                      ${product.costPrice.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-medium font-mono">
                      ${product.salesPrice.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-sm font-medium">
                        {product.currentStock}
                      </span>
                      <Badge variant={stockStatus.variant} className="text-xs">
                        {stockStatus.label}
                      </Badge>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Badge
                      variant={
                        product.productStatus === "ACTIVE"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {product.productStatus}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(product)}
                        className="h-8 w-8"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(product.id)}
                        className="h-8 w-8 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
