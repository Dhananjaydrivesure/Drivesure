import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Plus, Filter, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const customers = [
  { id: "CUST-001", name: "Acme Logistics", email: "contact@acmelogistics.com", status: "Active", spent: "$12,500", policies: 3 },
  { id: "CUST-002", name: "Globex Corp", email: "admin@globex.com", status: "Active", spent: "$45,200", policies: 12 },
  { id: "CUST-003", name: "Soylent Corp", email: "info@soylent.com", status: "Inactive", spent: "$2,300", policies: 1 },
  { id: "CUST-004", name: "Initech", email: "support@initech.com", status: "Pending", spent: "$0", policies: 0 },
  { id: "CUST-005", name: "Umbrella Corp", email: "security@umbrella.com", status: "Active", spent: "$89,000", policies: 24 },
  { id: "CUST-006", name: "Stark Ind", email: "tony@stark.com", status: "Active", spent: "$120,500", policies: 8 },
  { id: "CUST-007", name: "Wayne Ent", email: "bruce@wayne.com", status: "Active", spent: "$95,200", policies: 5 },
];

export default function Customers() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-foreground font-display">Customers</h1>
        <Button>
           <Plus className="h-4 w-4 mr-2" /> Add Customer
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-4">
           <CardTitle>Client List</CardTitle>
           <div className="flex gap-2">
             <div className="relative w-64">
               <Input placeholder="Search customers..." />
             </div>
             <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
             <Button variant="outline" size="icon"><Download className="h-4 w-4" /></Button>
           </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Policies</TableHead>
                <TableHead className="text-right">Total Spent</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{customer.name}</span>
                      <span className="text-xs text-muted-foreground">{customer.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={customer.status === "Active" ? "default" : customer.status === "Inactive" ? "secondary" : "outline"}>
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{customer.policies}</TableCell>
                  <TableCell className="text-right">{customer.spent}</TableCell>
                  <TableCell>
                     <DropdownMenu>
                       <DropdownMenuTrigger asChild>
                         <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
                       </DropdownMenuTrigger>
                       <DropdownMenuContent align="end">
                         <DropdownMenuItem>View Details</DropdownMenuItem>
                         <DropdownMenuItem>Edit</DropdownMenuItem>
                         <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                       </DropdownMenuContent>
                     </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
