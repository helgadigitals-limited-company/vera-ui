import { type TabItem, TabsContainer } from "@/components/tabs-container.tsx";
import { FileUpload } from "@/components/ui/file-upload";
import { ThemeProvider } from '@/components/theme-provider.tsx';
import { ThemeToggle } from '@/components/theme-toggle';

function App() {
    const tabs: TabItem[] = [
        {
            value: 'tab1',
            label: 'First Tab',
            content: <div>Tab 1 content</div>,
        },
        {
            value: 'tab2',
            label: 'Second Tab',
            content: <div>Tab 2 content</div>,
            disabled: false,
        },
    ];

    return (
        <>
            <ThemeProvider defaultTheme={'system'} storageKey={'vera-ui-theme'}>
                <div className="container mx-auto p-4">
                    <header className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-bold">Vera UI Demo</h1>
                        <ThemeToggle />
                    </header>
                    
                    <section className="flex flex-col gap-8 p-4 border rounded-lg">
                        <div className="flex justify-center items-center">
                            <TabsContainer
                                tabs={tabs}
                                defaultTab="tab1"
                                persistInUrl={false}
                                onTabChange={(value) => console.log('Tab changed:', value)}
                                containerHeight="300px"
                            />
                        </div>
                        
                        <div className="mt-8">
                            <h2 className="text-xl mb-4">File Upload Example</h2>
                            <FileUpload
                                onChange={(file) => console.log('File selected:', file)}
                                onError={(error) => console.error('File upload error:', error)}
                            />
                        </div>
                    </section>
                </div>
            </ThemeProvider>
        </>
    );
}

export default App;
