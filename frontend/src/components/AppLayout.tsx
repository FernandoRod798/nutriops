import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'
import AppSidebar from '@/components/AppSidebar'
import { useTheme } from '@/hooks/useTheme'

interface AppLayoutProps {
    children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
    const { isDark, toggleTheme } = useTheme()

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-14 items-center justify-between border-b px-4">
                    <div className="flex items-center gap-2">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <span className="text-sm text-muted-foreground">NutriOps</span>
                    </div>

                    {/* Botón toggle dark/light */}
                    <Button variant="ghost" size="icon" onClick={toggleTheme}>
                        {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
                    </Button>
                </header>

                <div className="p-6">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}