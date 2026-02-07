import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, FileImage, FileSpreadsheet, FileArchive, MoreVertical, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Files() {
  const files = [
    { name: "Q4_Financial_Report.pdf", type: "pdf", size: "2.4 MB", date: "Jan 12, 2024" },
    { name: "Project_Proposal.docx", type: "doc", size: "854 KB", date: "Jan 10, 2024" },
    { name: "Assets_Bundle.zip", type: "zip", size: "124 MB", date: "Jan 08, 2024" },
    { name: "Team_Photo_HiRes.jpg", type: "img", size: "8.2 MB", date: "Jan 05, 2024" },
    { name: "Budget_2025.xlsx", type: "sheet", size: "1.1 MB", date: "Jan 04, 2024" },
    { name: "Contract_Draft_v2.pdf", type: "pdf", size: "1.2 MB", date: "Jan 02, 2024" },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="h-8 w-8 text-red-500" />;
      case 'doc': return <FileText className="h-8 w-8 text-blue-500" />;
      case 'sheet': return <FileSpreadsheet className="h-8 w-8 text-green-500" />;
      case 'zip': return <FileArchive className="h-8 w-8 text-amber-500" />;
      case 'img': return <FileImage className="h-8 w-8 text-purple-500" />;
      default: return <FileText className="h-8 w-8 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-foreground font-display">Files</h1>
        <Button>Upload File</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {files.map((file, i) => (
          <Card key={i} className="hover:border-primary/50 transition-colors cursor-pointer group relative">
            <CardContent className="p-4 flex flex-col items-center text-center space-y-3 pt-6">
               <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="h-6 w-6"><MoreVertical className="h-3 w-3" /></Button>
               </div>
               
               <div className="p-3 bg-muted rounded-full">
                 {getIcon(file.type)}
               </div>
               
               <div className="space-y-1 w-full">
                 <p className="text-sm font-medium truncate w-full" title={file.name}>{file.name}</p>
                 <p className="text-xs text-muted-foreground">{file.size} • {file.date}</p>
               </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
