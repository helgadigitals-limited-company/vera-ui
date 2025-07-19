import {type TabItem, TabsContainer} from "@/components/tabs-container.tsx";

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
      <h1>hello world</h1>

        <div className={'container mx-auto'}>
            <section className='flex justify-center items-center p-20 container mx-auto'>
                <TabsContainer
                    tabs={tabs}
                    defaultTab="tab1"
                    persistInUrl={false}
                    onTabChange={(value) => console.log('Tab changed:', value)}
                    containerHeight="600px"
                />

            </section>
        </div>


    </>
  );
}

export default App;
