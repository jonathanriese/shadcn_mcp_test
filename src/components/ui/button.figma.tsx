import figma from "@figma/code-connect"
import { Button } from "./button"

figma.connect(
  Button,
  "https://www.figma.com/design/ejRYKClcVaPpz3q4h2XNZa/Obra-shadcn-ui-kit-community-edition--1.6.0---Community-?node-id=9-1071",
  {
    props: {
      variant: figma.enum("Variant", {
        Primary: "default",
        Secondary: "secondary",
        Destructive: "destructive",
        Outline: "outline",
        Ghost: "ghost",
      }),
      size: figma.enum("Size", {
        Default: "default",
        Small: "sm",
        Large: "lg",
        Mini: "sm",
        "Extra Large": "lg",
      }),
      disabled: figma.enum("State", {
        Default: false,
        "Hover & Active": false,
        Focus: false,
        Disabled: true,
      }),
    },
    example: ({ variant, size, disabled }) => (
      <Button variant={variant} size={size} disabled={disabled}>
        Label
      </Button>
    ),
  }
)
