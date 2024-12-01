
import { InputSearch } from "@/components/inputSearch";
import { Table } from "@/components/table"

export default function DashboardPage() {
    
    return (
        <main className="container mx-auto px-2 md:px-0">   
            <InputSearch />
            <Table/>
        </main>
    )
}