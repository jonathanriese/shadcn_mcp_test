import figma from "@figma/code-connect"
import { Badge } from "./badge"

figma.connect(
  Badge,
  "https://www.figma.com/design/ejRYKClcVaPpz3q4h2XNZa/Obra-shadcn-ui-kit-community-edition--1.6.0---Community-?node-id=19-6979",
  {
    props: {
      variant: figma.enum("Variant", {
        Primary: "default",
        Secondary: "secondary",
        Destructive: "destructive",
        Outline: "outline",
        Ghost: "secondary",
      }),
      label: figma.string("Label"),
    },
    example: ({ variant, label }) => (
      <Badge variant={variant}>{label}</Badge>
    ),
  }
)
