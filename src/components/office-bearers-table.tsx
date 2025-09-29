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
    <div className="rounded-lg border overflow-hidden bg-card">
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-center my-8 md:my-12 text-primary">
            IEEE STUDENT BRANCH OFFICE BEARERS – 2024-25
        </h2>
      <Table>
        <TableHeader>
          <TableRow className="bg-primary/90 hover:bg-primary/90">
            <TableHead className="w-[100px] text-primary-foreground font-bold">Sl. No.</TableHead>
            <TableHead className="text-primary-foreground font-bold">USN</TableHead>
            <TableHead className="text-primary-foreground font-bold">Name</TableHead>
            <TableHead className="text-primary-foreground font-bold">Department</TableHead>
            <TableHead className="text-primary-foreground font-bold">Sem</TableHead>
            <TableHead className="text-right text-primary-foreground font-bold">Position</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {officeBearers.map((bearer: OfficeBearer) => (
            <TableRow key={bearer.slNo}>
              <TableCell className="font-medium">{bearer.slNo}</TableCell>
              <TableCell>{bearer.usn}</TableCell>
              <TableCell>{bearer.name}</TableCell>
              <TableCell>{bearer.department}</TableCell>
              <TableCell>{bearer.sem}</TableCell>
              <TableCell className="text-right">{bearer.position}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
