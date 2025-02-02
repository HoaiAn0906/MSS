import { lusitana } from '@/components/shared/fonts'
import {
    CardsSkeleton,
} from '@/components/shared/skeletons'
import { Suspense } from 'react'
import {Card, CardContent, CardHeader} from "@/components/ui/card";

export default async function Page() {
    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Dashboard
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Suspense fallback={<CardsSkeleton />}>
                    <Card>
                        <CardHeader>
                            <h2>Revenue</h2>
                        </CardHeader>
                        <CardContent>
                            <p>€0.00</p>
                        </CardContent>
                    </Card>
                </Suspense>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
            </div>
        </main>
    )
}