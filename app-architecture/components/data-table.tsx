import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ReactNode } from "react"

interface DataTableProps {
  headers: ReactNode[]
  rows: ReactNode[][]
  caption?: ReactNode
}

export function DataTable({ headers, rows, caption }: DataTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        {caption && <caption className="mt-4 text-sm text-muted-foreground">{caption}</caption>}
        <TableHeader>
          <TableRow className="bg-muted/50">
            {headers.map((header, i) => (
              <TableHead key={i} className="font-semibold text-foreground">
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
              {row.map((cell, j) => (
                <TableCell key={j} className="align-top">
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
