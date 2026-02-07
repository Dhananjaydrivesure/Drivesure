import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search, Filter, MoreHorizontal, Briefcase, Phone, Mail, MapPin } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock Data Type
type Customer = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: "Active" | "Lead" | "Churned" | "Inactive";
  tier: "Enterprise" | "SMB" | "Startup";
  lastContact: string;
  notes: string;
};

// Initial Mock Data
const initialCustomers: Customer[] = [
  { 
    id: "CRM-001", 
    name: "Alice Cooper", 
    company: "Acme Logistics", 
    email: "alice@acmelogistics.com", 
    phone: "+1 (555) 123-4567",
    status: "Active", 
    tier: "Enterprise",
    lastContact: "2 days ago",
    notes: "Key account. Interested in fleet expansion Q3."
  },
  { 
    id: "CRM-002", 
    name: "Bob Smith", 
    company: "Globex Corp", 
    email: "bob.smith@globex.com", 
    phone: "+1 (555) 987-6543",
    status: "Lead", 
    tier: "Enterprise",
    lastContact: "1 week ago",
    notes: "Follow up on contract draft."
  },
  { 
    id: "CRM-003", 
    name: "Charlie Brown", 
    company: "Soylent Corp", 
    email: "charlie@soylent.com", 
    phone: "+1 (555) 456-7890",
    status: "Churned", 
    tier: "SMB",
    lastContact: "3 months ago",
    notes: "Lost to competitor due to pricing."
  },
  { 
    id: "CRM-004", 
    name: "Diana Prince", 
    company: "Initech", 
    email: "diana@initech.com", 
    phone: "+1 (555) 234-5678",
    status: "Active", 
    tier: "Startup",
    lastContact: "Yesterday",
    notes: "New onboarding scheduled."
  },
  { 
    id: "CRM-005", 
    name: "Evan Wright", 
    company: "Umbrella Corp", 
    email: "evan@umbrella.com", 
    phone: "+1 (555) 876-5432",
    status: "Inactive", 
    tier: "Enterprise",
    lastContact: "1 month ago",
    notes: "Contract renewal discussion pending."
  },
];

export default function CRM() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  // New Customer Form State
  const [newCustomer, setNewCustomer] = useState<Partial<Customer>>({
    status: "Lead",
    tier: "Startup"
  });

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCustomer = () => {
    if (!newCustomer.name || !newCustomer.company) return; // Basic validation
    
    const customer: Customer = {
      id: `CRM-${String(customers.length + 1).padStart(3, '0')}`,
      name: newCustomer.name || "Unknown",
      company: newCustomer.company || "Unknown",
      email: newCustomer.email || "",
      phone: newCustomer.phone || "",
      status: newCustomer.status as any || "Lead",
      tier: newCustomer.tier as any || "Startup",
      lastContact: "Just now",
      notes: newCustomer.notes || ""
    };

    setCustomers([customer, ...customers]);
    setIsAddDialogOpen(false);
    setNewCustomer({ status: "Lead", tier: "Startup" }); // Reset form
  };

  const deleteCustomer = (id: string) => {
    setCustomers(customers.filter(c => c.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-200";
      case "Lead": return "bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200";
      case "Churned": return "bg-red-100 text-red-700 hover:bg-red-200 border-red-200";
      case "Inactive": return "bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getTierBadge = (tier: string) => {
    switch(tier) {
      case "Enterprise": return "bg-indigo-100 text-indigo-700 border-indigo-200";
      case "SMB": return "bg-purple-100 text-purple-700 border-purple-200";
      default: return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
            <Briefcase className="h-8 w-8 text-primary" /> CRM Module
          </h1>
          <p className="text-muted-foreground mt-1">Manage customer relationships, leads, and accounts.</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="shadow-sm">
              <Plus className="h-4 w-4 mr-2" /> Add New Customer
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add Customer</DialogTitle>
              <DialogDescription>
                Create a new customer profile. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    placeholder="Jane Doe" 
                    value={newCustomer.name || ""}
                    onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="company">Company</Label>
                  <Input 
                    id="company" 
                    placeholder="Acme Inc." 
                    value={newCustomer.company || ""}
                    onChange={(e) => setNewCustomer({...newCustomer, company: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    placeholder="jane@example.com" 
                    type="email"
                    value={newCustomer.email || ""}
                    onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input 
                    id="phone" 
                    placeholder="+1 (555) 000-0000" 
                    value={newCustomer.phone || ""}
                    onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="grid gap-2">
                    <Label htmlFor="status">Status</Label>
                    <Select 
                      onValueChange={(value) => setNewCustomer({...newCustomer, status: value as any})}
                      defaultValue={newCustomer.status}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Lead">Lead</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                 </div>
                 <div className="grid gap-2">
                    <Label htmlFor="tier">Tier</Label>
                    <Select 
                      onValueChange={(value) => setNewCustomer({...newCustomer, tier: value as any})}
                      defaultValue={newCustomer.tier}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select tier" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Enterprise">Enterprise</SelectItem>
                        <SelectItem value="SMB">SMB</SelectItem>
                        <SelectItem value="Startup">Startup</SelectItem>
                      </SelectContent>
                    </Select>
                 </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea 
                  id="notes" 
                  placeholder="Add any initial notes or requirements..." 
                  value={newCustomer.notes || ""}
                  onChange={(e) => setNewCustomer({...newCustomer, notes: e.target.value})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddCustomer}>Create Customer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Leads</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.filter(c => c.status === 'Lead').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enterprise Clients</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.filter(c => c.tier === 'Enterprise').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">2.4%</div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-t-4 border-t-primary shadow-sm">
        <CardHeader className="pb-3">
           <div className="flex items-center justify-between">
             <CardTitle>Customer Database</CardTitle>
             <div className="flex gap-2">
               <div className="relative w-72">
                 <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                 <Input 
                    placeholder="Search by name, company, email..." 
                    className="pl-8 bg-muted/30" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                 />
               </div>
               <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
             </div>
           </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-[80px]">ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Contact Info</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Contact</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                      No customers found matching your search.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCustomers.map((customer) => (
                    <TableRow key={customer.id} className="group hover:bg-muted/5">
                      <TableCell className="font-mono text-xs font-medium text-muted-foreground">{customer.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9 border">
                            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${customer.name}`} />
                            <AvatarFallback>{customer.name.substring(0,2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="font-semibold text-foreground">{customer.name}</span>
                            <div className="flex items-center gap-2">
                              <Briefcase className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">{customer.company}</span>
                              <Badge variant="outline" className={`text-[10px] px-1.5 py-0 h-4 ${getTierBadge(customer.tier)}`}>
                                {customer.tier}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                            <Mail className="h-3.5 w-3.5" /> {customer.email}
                          </div>
                          {customer.phone && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Phone className="h-3.5 w-3.5" /> {customer.phone}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`font-medium ${getStatusColor(customer.status)}`}>
                          {customer.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">{customer.lastContact}</span>
                      </TableCell>
                      <TableCell>
                         <DropdownMenu>
                           <DropdownMenuTrigger asChild>
                             <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"><MoreHorizontal className="h-4 w-4" /></Button>
                           </DropdownMenuTrigger>
                           <DropdownMenuContent align="end">
                             <DropdownMenuLabel>Actions</DropdownMenuLabel>
                             <DropdownMenuItem>View Profile</DropdownMenuItem>
                             <DropdownMenuItem>Edit Details</DropdownMenuItem>
                             <DropdownMenuItem>Add Note</DropdownMenuItem>
                             <DropdownMenuSeparator />
                             <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => deleteCustomer(customer.id)}>
                               Delete Customer
                             </DropdownMenuItem>
                           </DropdownMenuContent>
                         </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
