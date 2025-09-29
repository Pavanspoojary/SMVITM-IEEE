import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { officeBearers, OfficeBearer } from '@/app/data/office-bearers';

export function OfficeBearersTable() {
  return (
    <div className="rounded-lg border border-border/50 overflow-hidden bg-card shadow-lg">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-center my-12 md:my-16 text-foreground">
            IEEE STUDENT BRANCH OFFICE BEARERS – 2024-25
        </h2>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30 hover:bg-muted/40 border-b-border/50">
            <TableHead className="w-[100px] text-foreground font-bold">Sl. No.</TableHead>
            <TableHead className="text-foreground font-bold">USN</TableHead>
            <TableHead className="text-foreground font-bold">Name</TableHead>
            <TableHead className="text-foreground font-bold">Department</TableHead>
            <TableHead className="text-foreground font-bold">Sem</TableHead>
            <TableHead className="text-right text-foreground font-bold">Position</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {officeBearers.map((bearer: OfficeBearer) => (
            <TableRow key={bearer.slNo} className="border-border/50">
              <TableCell className="font-medium text-muted-foreground">{bearer.slNo}</TableCell>
              <TableCell>{bearer.usn}</TableCell>
              <TableCell className="font-medium">{bearer.name}</TableCell>
              <TableCell>{bearer.department}</TableCell>
              <TableCell>{bearer.sem}</TableCell>
              <TableCell className="text-right font-medium text-primary">{bearer.position}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
