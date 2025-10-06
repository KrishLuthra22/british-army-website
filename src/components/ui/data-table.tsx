import { ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";

interface Column {
  key: string;
  header: string;
  className?: string;
}

interface DataTableProps {
  columns: Column[];
  data: Record<string, ReactNode>[];
  className?: string;
}

export function DataTable({ columns, data, className }: DataTableProps) {
  return (
    <Card className={`shadow-card-custom ${className}`}>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              {columns.map((column) => (
                <TableHead key={column.key} className={`font-semibold ${column.className || ""}`}>
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index} className="hover:bg-muted/20 transition-colors">
                {columns.map((column) => (
                  <TableCell key={column.key} className={column.className}>
                    {row[column.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}