import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Send } from "lucide-react";

export default function Messages() {
  const conversations = [
    { id: 1, name: "Alice Cooper", msg: "Can you send me the policy details?", time: "2m", active: true },
    { id: 2, name: "Bob Smith", msg: "Meeting confirmed for tomorrow.", time: "1h", active: false },
    { id: 3, name: "Charlie Brown", msg: "I uploaded the documents.", time: "3h", active: false },
    { id: 4, name: "Diana Prince", msg: "Thanks for the quick response!", time: "1d", active: false },
  ];

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-4">
      <div className="flex items-center justify-between">
         <h1 className="text-3xl font-bold tracking-tight text-foreground font-display">Messages</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
        {/* Sidebar List */}
        <Card className="md:col-span-1 h-full flex flex-col">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search messages..." className="pl-8" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map((chat) => (
              <div 
                key={chat.id} 
                className={`p-4 flex items-center gap-3 hover:bg-muted/50 cursor-pointer border-l-4 ${chat.active ? "bg-muted/30 border-primary" : "border-transparent"}`}
              >
                <Avatar>
                   <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${chat.name}`} />
                   <AvatarFallback>{chat.name.substring(0,2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <div className="flex justify-between items-center">
                    <span className="font-medium truncate">{chat.name}</span>
                    <span className="text-xs text-muted-foreground">{chat.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{chat.msg}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Chat Area */}
        <Card className="md:col-span-2 h-full flex flex-col">
          <CardHeader className="border-b p-4 flex flex-row items-center gap-3">
             <Avatar>
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alice Cooper" />
                <AvatarFallback>AC</AvatarFallback>
             </Avatar>
             <div>
               <CardTitle className="text-base">Alice Cooper</CardTitle>
               <p className="text-xs text-muted-foreground flex items-center gap-1">
                 <span className="h-2 w-2 rounded-full bg-green-500"></span> Online
               </p>
             </div>
          </CardHeader>
          <CardContent className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 bg-muted/10">
             <div className="self-end bg-primary text-primary-foreground p-3 rounded-lg rounded-tr-none max-w-[80%]">
               Hi Alice, how can I help you today?
             </div>
             <div className="self-start bg-card border p-3 rounded-lg rounded-tl-none max-w-[80%] shadow-sm">
               Can you send me the policy details for the new fleet vehicle?
             </div>
             <div className="self-end bg-primary text-primary-foreground p-3 rounded-lg rounded-tr-none max-w-[80%]">
               Sure, I'll pull that up right now. Give me a moment.
             </div>
          </CardContent>
          <div className="p-4 border-t">
            <form className="flex gap-2">
              <Input placeholder="Type your message..." className="flex-1" />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}
