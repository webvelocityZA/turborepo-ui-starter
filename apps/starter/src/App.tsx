import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import { Typography } from "@workspace/ui/components/typography";

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto py-8 px-4">
        <header className="text-center mb-12">
          <Typography.H1 className="text-4xl mb-4">Turborepo UI Starter</Typography.H1>
          <Typography.Muted className="max-w-2xl mx-auto">
            A minimalistic monorepo setup with shared UI components from the <code className="bg-gray-100 px-1 py-0.5 rounded">@workspace/ui</code> package.
          </Typography.Muted>
        </header>

        <Tabs defaultValue="components" className="max-w-4xl mx-auto">
          <TabsList className="mb-6">
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="stack">Tech Stack</TabsTrigger>
            <TabsTrigger value="usage">Usage Guide</TabsTrigger>
          </TabsList>

          <TabsContent value="components" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Button Component Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Button Component</CardTitle>
                  <CardDescription>Various button styles from the UI package</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-3">
                  <Button variant="default">Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="link">Link</Button>
                </CardContent>
                <CardFooter className="text-sm text-gray-500">
                  Import from: <code>@workspace/ui/components/button</code>
                </CardFooter>
              </Card>

              {/* Card Component Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Card Component</CardTitle>
                  <CardDescription>Flexible card layout with multiple sub-components</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Cards provide a flexible container for displaying content with a consistent style.
                    They include CardHeader, CardTitle, CardDescription, CardContent, and CardFooter.
                  </p>
                </CardContent>
                <CardFooter className="text-sm text-gray-500">
                  Import from: <code>@workspace/ui/components/card</code>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="stack" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tech Stack</CardTitle>
                <CardDescription>The technologies used in this monorepo</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>React 19</strong> - Latest version of React with improved performance</li>
                  <li><strong>TypeScript</strong> - For type safety and better developer experience</li>
                  <li><strong>Vite</strong> - Fast, modern frontend build tool</li>
                  <li><strong>TailwindCSS</strong> - Utility-first CSS framework</li>
                  <li><strong>Radix UI</strong> - Unstyled, accessible UI components</li>
                  <li><strong>Framer Motion</strong> - Animation library for React</li>
                  <li><strong>Turborepo</strong> - Monorepo build system for JavaScript/TypeScript</li>
                  <li><strong>Biome</strong> - Fast linter and formatter</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="usage" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Usage Guide</CardTitle>
                <CardDescription>How to use components from the UI package</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">1. Import components</h3>
                  <pre className="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto">
                    {`import { Button } from "@workspace/ui/components/button";
import { Card } from "@workspace/ui/components/card";`}
                  </pre>
                </div>
                <div>
                  <h3 className="font-medium mb-2">2. Use in your components</h3>
                  <pre className="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto">
                    {`<Button variant="default">Click me</Button>
<Card>
  <CardContent>Card content here</CardContent>
</Card>`}
                  </pre>
                </div>
                <div>
                  <h3 className="font-medium mb-2">3. Run development server</h3>
                  <pre className="bg-gray-100 p-3 rounded-md text-sm">pnpm dev</pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <footer className="mt-16 text-center text-sm text-gray-500">
          <p>Built with Turborepo, React, TypeScript, and TailwindCSS</p>
        </footer>
      </div>
    </div>
  );
};
