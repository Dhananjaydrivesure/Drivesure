import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const events = [
    { date: new Date(), title: "Quarterly Review", time: "10:00 AM", type: "meeting" },
    { date: new Date(), title: "Client Call: Smith Logistics", time: "2:00 PM", type: "call" },
    { date: new Date(new Date().setDate(new Date().getDate() + 1)), title: "Policy Renewal Deadline", time: "5:00 PM", type: "deadline" },
    { date: new Date(new Date().setDate(new Date().getDate() + 2)), title: "Team Lunch", time: "12:30 PM", type: "social" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-foreground font-display">Calendar</h1>
        <div className="flex gap-2">
            <Badge variant="outline" className="px-3 py-1">Month</Badge>
            <Badge variant="secondary" className="px-3 py-1">Week</Badge>
            <Badge variant="secondary" className="px-3 py-1">Day</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.map((event, index) => (
                <div key={index} className="flex items-center p-3 border rounded-lg bg-card hover:bg-muted/30 transition-colors">
                   <div className="w-16 text-center border-r pr-3 mr-3">
                      <div className="text-xs text-muted-foreground uppercase font-semibold">{event.date.toLocaleDateString('en-US', { month: 'short' })}</div>
                      <div className="text-xl font-bold">{event.date.getDate()}</div>
                   </div>
                   <div className="flex-1">
                      <h4 className="font-semibold">{event.title}</h4>
                      <p className="text-sm text-muted-foreground">{event.time}</p>
                   </div>
                   <Badge variant={event.type === 'deadline' ? 'destructive' : event.type === 'meeting' ? 'default' : 'secondary'}>
                      {event.type}
                   </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
           <CardHeader>
             <CardTitle>Select Date</CardTitle>
           </CardHeader>
           <CardContent className="flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border shadow-sm"
              />
           </CardContent>
        </Card>
      </div>
    </div>
  );
}
