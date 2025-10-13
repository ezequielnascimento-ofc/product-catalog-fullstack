import { useState, useMemo, useEffect } from "react";
import type { Product } from "@/lib/types";
import CustomNavbar from "@/components/Navbar";
import { mockProducts } from "@/lib/mockData";
import { ProductTable } from "@/components/ProductTable";
import { ProductFormModal } from "@/components/ProductFormModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Search,
  Package,
  Users,
  UserRoundMinus,
  BriefcaseBusiness,
  UserStar,
} from "lucide-react";
import { productService } from "@/services/ProductServices";

export default function ProductManagementPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<string>("name");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductsFromAPI = async () => {
      try {
        setLoading(true);
        setError(null);
        const productsFromAPI = await productService.getAll();
        setProducts(productsFromAPI);
      } catch (err) {
        console.error("❌ Erro ao buscar produtos da API:", err);
        setError("Erro ao carregar produtos da API");
      } finally {
        setLoading(false);
      }
    };

    fetchProductsFromAPI();
    const intervalId = setInterval(fetchProductsFromAPI, 15000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    const search = searchQuery?.toLowerCase() || "";

    const filtered = products.filter(
      (product) =>
        product?.name?.toLowerCase().includes(search) ||
        product?.category?.toLowerCase().includes(search)
    );

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return (a?.name || "").localeCompare(b?.name || "");
        case "price":
          return (b?.salesPrice || 0) - (a?.salesPrice || 0);
        case "stock":
          return (a?.currentStock || 0) - (b?.currentStock || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, searchQuery, sortBy]);

  const handleSaveProduct = async (
    productData: Omit<Product, "id"> & { id?: number }
  ) => {
    try {
      if (productData.id) {
        console.log("📝 Atualizando produto na API:", productData.id);
        const updatedProduct = await productService.update(
          productData.id,
          productData
        );

        setProducts((prev) =>
          prev.map((p) => (p.id === productData.id ? updatedProduct : p))
        );

        console.log("✅ Produto atualizado com sucesso");
      } else {
        const newProduct = await productService.create(productData);
        setProducts((prev) => [...prev, newProduct]);
      }

      setIsModalOpen(false);
      setEditingProduct(null);
    } catch (err) {
      console.error("❌ Erro ao salvar produto:", err);
      alert("Erro ao salvar produto. Verifique o console para mais detalhes.");
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este produto?")) {
      return;
    }

    try {
      console.log("🗑️ Deletando produto da API:", id);

      await productService.delete(id);

      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("❌ Erro ao deletar produto:", err);
    }
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <CustomNavbar></CustomNavbar>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="bg-muted">
            <TabsTrigger value="products" className="gap-2">
              <Package className="h-4 w-4" />
              Products
            </TabsTrigger>
            <TabsTrigger value="customers" className="gap-2">
              <Users className="h-4 w-4" />
              Customers
            </TabsTrigger>
            <TabsTrigger value="supplier" className="gap-2">
              <BriefcaseBusiness className="h-4 w-4" />
              Supplier
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-2">
              <UserRoundMinus className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="admin" className="gap-2">
              <UserStar className="h-4 w-4" />
              Admin
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full sm:w-auto">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="stock">Stock Level</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAddNew} className="gap-2 w-full sm:w-auto">
                <Plus className="h-4 w-4" />
                Add Product
              </Button>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              <div className="rounded-lg border border-border bg-card p-6">
                <div className="text-sm text-muted-foreground">
                  Total Products
                </div>
                <div className="text-3xl font-semibold mt-2">
                  {products.length}
                </div>
              </div>
              <div className="rounded-lg border border-border bg-card p-6">
                <div className="text-sm text-muted-foreground">
                  Active Products
                </div>
                <div className="text-3xl font-semibold mt-2">
                  {products.filter((p) => p.productStatus === "ACTIVE").length}
                </div>
              </div>
              <div className="rounded-lg border border-border bg-card p-6">
                <div className="text-sm text-muted-foreground">
                  Low Stock Items
                </div>
                <div className="text-3xl font-semibold mt-2 text-destructive">
                  {products.filter((p) => p.currentStock <= p.stockMin).length}
                </div>
              </div>
              <div className="rounded-lg border border-border bg-card p-6">
                <div className="text-sm text-muted-foreground">Total Value</div>
                <div className="text-3xl font-semibold mt-2">
                  $
                  {products
                    .reduce((sum, p) => sum + p.salesPrice * p.currentStock, 0)
                    .toFixed(0)}
                </div>
              </div>
            </div>

            {/* Product Table */}
            <ProductTable
              products={filteredAndSortedProducts}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
            />
          </TabsContent>

          <TabsContent value="customers" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  Customer Database
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  View and manage your customer information
                </p>
              </div>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Customer
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Product Form Modal */}
      <ProductFormModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        product={editingProduct}
        onSave={handleSaveProduct}
      />
    </div>
  );
}
