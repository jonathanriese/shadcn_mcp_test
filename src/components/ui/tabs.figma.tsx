import figma from "@figma/code-connect"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs"

figma.connect(
  TabsList,
  "https://www.figma.com/design/ejRYKClcVaPpz3q4h2XNZa/Obra-shadcn-ui-kit-community-edition--1.6.0---Community-?node-id=9-639",
  {
    props: {
      parts: figma.enum("Parts", {
        "2 Parts": 2,
        "3 Parts": 3,
        "4 Parts": 4,
        "5 Parts": 5,
      }),
    },
    example: () => (
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content for Tab 1</TabsContent>
        <TabsContent value="tab2">Content for Tab 2</TabsContent>
      </Tabs>
    ),
  }
)

figma.connect(
  TabsTrigger,
  "https://www.figma.com/design/ejRYKClcVaPpz3q4h2XNZa/Obra-shadcn-ui-kit-community-edition--1.6.0---Community-?node-id=9-634",
  {
    props: {
      label: figma.string("Content"),
    },
    example: ({ label }) => (
      <TabsTrigger value="tab">
        {label}
      </TabsTrigger>
    ),
  }
)
