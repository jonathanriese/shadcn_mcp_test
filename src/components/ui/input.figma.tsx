import figma from "@figma/code-connect"
import { Input } from "./input"

figma.connect(
  Input,
  "https://www.figma.com/design/ejRYKClcVaPpz3q4h2XNZa/Obra-shadcn-ui-kit-community-edition--1.6.0---Community-?node-id=66-5981",
  {
    props: {
      disabled: figma.enum("State", {
        Default: false,
        Focus: false,
        Error: false,
        "Error Focus": false,
        Disabled: true,
      }),
      type: figma.enum("File Chosen", {
        False: "text",
        True: "file",
      }),
    },
    example: ({ disabled, type }) => (
      <Input type={type} placeholder="Placeholder" disabled={disabled} />
    ),
  }
)
