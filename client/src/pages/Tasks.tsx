import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Tasks() {
  const tasks = [
    { id: 1, title: "Review quarterly report", priority: "High", completed: false, tag: "Finance" },
    { id: 2, title: "Update privacy policy", priority: "Medium", completed: true, tag: "Legal" },
    { id: 3, title: "Client meeting preparation", priority: "High", completed: false, tag: "Sales" },
    { id: 4, title: "Server maintenance check", priority: "Low", completed: false, tag: "IT" },
    { id: 5, title: "Draft marketing email", priority: "Medium", completed: false, tag: "Marketing" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-foreground font-display">Tasks</h1>
        <Button>
           <Plus className="h-4 w-4 mr-2" /> New Task
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <Card>
           <CardHeader>
             <CardTitle>My Tasks</CardTitle>
           </CardHeader>
           <CardContent className="space-y-4">
             {tasks.map((task) => (
               <div key={task.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-muted/20">
                 <Checkbox id={`task-${task.id}`} checked={task.completed} className="mt-1" />
                 <div className="flex-1 space-y-1">
                   <label
                     htmlFor={`task-${task.id}`}
                     className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${task.completed ? 'line-through text-muted-foreground' : ''}`}
                   >
                     {task.title}
                   </label>
                   <div className="flex gap-2">
                     <Badge variant="outline" className="text-[10px] h-5">{task.tag}</Badge>
                     <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                       task.priority === 'High' ? 'bg-red-100 text-red-700' :
                       task.priority === 'Medium' ? 'bg-amber-100 text-amber-700' :
                       'bg-blue-100 text-blue-700'
                     }`}>
                       {task.priority}
                     </span>
                   </div>
                 </div>
               </div>
             ))}
           </CardContent>
         </Card>
         
         <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
               <CardTitle>Productivity</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="flex items-center justify-center h-48">
                  <div className="text-center">
                     <div className="text-5xl font-bold text-primary mb-2">85%</div>
                     <p className="text-muted-foreground">Tasks Completed this Week</p>
                  </div>
               </div>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}
