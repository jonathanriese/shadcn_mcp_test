import figma from "@figma/code-connect"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card"

figma.connect(
  Card,
  "https://www.figma.com/design/ejRYKClcVaPpz3q4h2XNZa/Obra-shadcn-ui-kit-community-edition--1.6.0---Community-?node-id=179-29234",
  {
    example: () => (
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description goes here.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card content</p>
        </CardContent>
        <CardFooter>
          <p>Card footer</p>
        </CardFooter>
      </Card>
    ),
  }
)
